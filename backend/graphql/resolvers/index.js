const authResolver = require('./auth');
const proffesorResolver = require('./proffesor');
const studentResolver = require('./student');

const rootResolver = {
    ...authResolver,
    ...proffesorResolver,
    ...studentResolver
};

module.exports = rootResolver;