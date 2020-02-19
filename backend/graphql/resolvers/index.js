const adminResolver = require('./admin');
const proffesorResolver = require('./proffesor');
const studentResolver = require('./student');
const courseResolver = require('./course');

const rootResolver = {
    ...adminResolver,
    ...proffesorResolver,
    ...studentResolver,
    ...courseResolver
};

module.exports = rootResolver;