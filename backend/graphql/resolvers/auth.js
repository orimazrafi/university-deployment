const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const config = require('config');

const User = require('../../models/user');

module.exports = {
    createUser: async args => {
        console.log(args)
        try {
            const existingUser = await User.findOne({ email: args.userInput.email });
            if (existingUser) {
                throw new Error('User exists already.');
            }
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
            const user = new User({
                email: args.userInput.email,
                password: hashedPassword,
                name: args.userInput.name,
                role: "Admin"
            });

            const result = await user.save();
            const token = jwt.sign(
                { email: args.userInput.email },
                config.get('jwtPrivateKey'),
                { expiresIn: '1h' })
            console.log('result:', result)
            return { userId: result.id, name: result.name, token, role: result.role };
        } catch (err) {
            throw err;
        }
    },
    loginUser: async ({ email, password }) => {
        const user = await User.findOne({ email });
        if (!user) throw new Error("user email doesn't exist");
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) throw new Error("user password doesn't exist");
        const token = jwt.sign(
            { email: user.email },
            config.get('jwtPrivateKey'),
            { expiresIn: '1h' })
        return { userId: user.id, token, tokenExpiration: 1, name: user.name, role: user.role }
    }
};