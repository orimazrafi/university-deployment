const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const config = require('config')
const Proffesor = require('../../models/proffesor');

module.exports = {
    createProffesor: async args => {
        try {
            const existingUser = await Proffesor.findOne({ email: args.proffesorInput.email });
            if (existingUser) {
                return new Error('User exists already.');
            }
            const hashedPassword = await bcrypt.hash(args.proffesorInput.password, 12);
            const proffesor = new Proffesor({
                email: args.proffesorInput.email,
                password: hashedPassword,
                name: args.proffesorInput.name,
                role: "proffesor"
            });
            const result = await proffesor.save();
            const token = jwt.sign(
                { email: args.proffesorInput.email },
                config.get('jwtPrivateKey'),
                { expiresIn: '1h' })
            return { userId: result.id, name: result.name, token, role: result.role };
        } catch (err) {
            throw err;
        }
    },
    loginProffesor: async ({ email, password }) => {
        console.log('we are here!', email, password)
        const user = await Proffesor.findOne({ email });
        console.log(user)
        if (!user) throw new Error("user email doesn't exist");
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) throw new Error("user password doesn't exist");
        const token = jwt.sign(
            { email: user.email },
            config.get('jwtPrivateKey'),
            { expiresIn: '1h' })
        return { userId: user.id, token, name: user.name, role: user.role }
    },
    proffesorsList: async ({ name }) => {
        let filteredProffesors = []
        try {

            const proffesors = await Proffesor.find();
            if (proffesors.length === 0) {

                throw new Error('There are no proffesors yet!')
            }
            filteredProffesors = proffesors.map(p => ({ name: p.name, email: p.email }))
        } catch (ex) {
            console.log(ex.message)
        }
        return filteredProffesors
    }
};