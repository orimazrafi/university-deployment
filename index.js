const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { graphqlUploadExpress } = require('graphql-upload')
const mongoose = require('mongoose');
const Course = require('./models/course');
const path = require('path');

const config = require('config')
const grapQlSchema = require('./graphql/schema')
const rootResolvers = require('./graphql/resolvers/index')

const app = express();
const http = require("http").Server(app);

const socketIO = require("socket.io");
const port = config.get('port');

const io = socketIO(http)

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') return res.sendStatus(200)
    next()
})



app.use(bodyParser.json());

io.on("connection", socket => {
    console.log("Connection established!")
    socket.on("Join", async room => {
        socket.on(room, async (msg) => {
            let course = await Course.findByIdAndUpdate(
                { _id: msg.courseId },
                {
                    $push: {
                        courseChat:
                        {
                            sender: msg.userId,
                            name: msg.userName,
                            message: msg.message,
                            time: msg.time,
                            publicId: msg.publicId

                        }
                    }
                }, { new: true }
            )
            await course.save()
            io.emit(room, { msg, room })

        })
        io.emit("Join", room);
    });
    socket.on("disconnect", () => {
        console.log("Disconnected!")
    })

})



app.use('/graphql-university',
    graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
    graphqlHttp({
        schema: grapQlSchema,
        rootValue: rootResolvers,
        graphiql: true
    }))

app.use(express.static('public'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(
    config.get('db')
).
    then(() =>
        http.listen(port)
    ).catch(err => {
        console.log(err)
    })