const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const { graphqlUploadExpress } = require("graphql-upload");
const mongoose = require("mongoose");
const Course = require("./models/course");

const grapQlSchema = require("./graphql/schema");
const rootResolvers = require("./graphql/resolvers/index");

const app = express();
const http = require("http").Server(app);

const socketIO = require("socket.io");
const PORT = process.env.PORT || 8080;

const io = socketIO(http);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

app.use(bodyParser.json());

io.on("connection", socket => {
  console.log("Connection established!");
  socket.on("Join", async ({ room }) => {
    socket.on(room, async msg => {
      console.log("msg", msg);
      let course = await Course.findByIdAndUpdate(
        { _id: msg.courseId },
        {
          $push: {
            courseChat: {
              sender: msg.userId,
              name: msg.userName,
              message: msg.message,
              time: msg.time,
              publicId: msg.publicId
            }
          }
        },
        { new: true }
      );
      await course.save();

      io.emit(room, { msg, room });
    });
    io.emit("Join", room);
  });
  socket.on("disconnect", () => {
    console.log("Disconnected!");
  });
});

app.use(
  "/graphql-university",
  graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
  graphqlHttp({
    schema: grapQlSchema,
    rootValue: rootResolvers,
    graphiql: true
  })
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose
  .connect(process.env.MONGODB_URI || process.env.LOCAL_MONGODB_URI)
  .then(() => http.listen(PORT))
  .catch(err => {
    console.log(err);
  });
