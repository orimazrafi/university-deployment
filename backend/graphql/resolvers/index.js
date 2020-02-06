const authResolver = require('./auth');
const proffesorResolver = require('./proffesor');
const studentResolver = require('./student');
const courseResolver = require('./course');

const rootResolver = {
    ...authResolver,
    ...proffesorResolver,
    ...studentResolver,
    ...courseResolver
};

module.exports = rootResolver;