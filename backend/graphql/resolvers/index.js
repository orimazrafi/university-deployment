const authResolver = require('./auth');
const proffesorResolver = require('./proffesor');

const rootResolver = {
    ...authResolver,
    ...proffesorResolver
};

module.exports = rootResolver;