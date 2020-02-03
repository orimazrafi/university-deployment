const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const config = require('config')
const User = require('../../models/user');

module.exports = {
    createUser: async args => {
        try {
            const existingUser = await User.findOne({ email: args.userInput.email });
            if (existingUser) {
                throw new Error('User exists already.');
            }
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

            const user = new User({
                email: args.userInput.email,
                password: hashedPassword
            });

            const result = await user.save();

            return { ...result._doc, password: null, _id: result.id };
        } catch (err) {
            throw err;
        }
    },
    login: async ({ email, password }) => {
        console.log('ddd', email)
        const user = await User.findOne({ email });
        console.log(user)
        if (!user) throw new Error("user email doesn't exist");
        // const isEqual = await bcrypt.compare(password, user.password);
        // if (!isEqual) throw new Error("user password doesn't exist");
        const token = jwt.sign(
            { email: user.email },
            config.get('jwtPrivateKey'),
            { expiresIn: '1h' })
        return { userId: user.id, token, tokenExpiration: 1 }
    }
};