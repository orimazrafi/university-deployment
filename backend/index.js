const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { graphqlUploadExpress } = require('graphql-upload')
const mongoose = require('mongoose');
var multer = require('multer')

const config = require('config')
const grapQlSchema = require('./graphql/schema')
const rootResolvers = require('./graphql/resolvers/index')

const app = express();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
var upload = multer({ storage: storage }).single('file')


app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') return res.sendStatus(200)
    next()
})



app.use(bodyParser.json());




app.use('/graphql-university',
    graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
    graphqlHttp({
        schema: grapQlSchema,
        rootValue: rootResolvers,
        graphiql: true
    }))

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true); mongoose.connect(
    config.get('db')
).

    then(() =>
        app.listen(config.get('port'))
    ).catch(err => {
        console.log(err)
    })
module.exports.upload = upload
