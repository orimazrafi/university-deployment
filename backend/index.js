const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const config = require('config')
const grapQlSchema = require('./graphql/schema')
const rootResolvers = require('./graphql/resolvers/index')

const app = express();


app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') return res.sendStatus(200)
    next()
})


app.use(bodyParser.json());




app.use('/graphql-university', graphqlHttp({
    schema: grapQlSchema,
    rootValue: rootResolvers,
    graphiql: true
}));

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

