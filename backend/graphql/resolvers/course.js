// const bcrypt = require('bcryptjs');
// const jwt = require("jsonwebtoken");
// const config = require('config')
const Course = require('../../models/course');

module.exports = {
    createCourse: async args => {
        try {
            const existingCourse = await Course.findOne({ name: args.courseInput.name });
            if (existingCourse) {
                return new Error('Course exists already.');
            }
            const course = new Course({
                name: args.courseInput.name,
                description: args.courseInput.description,
                points: args.courseInput.points,
                proffesorId: args.courseInput.proffesorId
            });
            const result = await course.save();
            return {
                courseId: result.id, name: result.name, points: result.points,
                description: result.description, proffesorId: result.proffesorId
            };
        } catch (err) {
            throw err;
        }
    },
    getCourses: async ({ proffesorId }) => {
        let courses = []
        try {

            courses = await Course.find({ proffesorId });
            console.log(courses)
            if (courses.length === 0) {

                throw new Error('There are no courses yet!')
            }
            // filteredProffesors = proffesors.map(p => ({ name: p.name, email: p.email }))
        } catch (ex) {
            console.log(ex.message)
        }
        return courses
    }

    // login: async ({ email, password }) => {
    //     console.log('we are here!', email, password)
    //     const user = await Proffesor.findOne({ email });
    //     console.log(user)
    //     if (!user) throw new Error("user email doesn't exist");
    //     const isEqual = await bcrypt.compare(password, user.password);
    //     if (!isEqual) throw new Error("user password doesn't exist");
    //     const token = jwt.sign(
    //         { email: user.email },
    //         config.get('jwtPrivateKey'),
    //         { expiresIn: '1h' })
    //     return { userId: user.id, token, name: user.name, role: user.role }
    // },
    // proffesorsList: async ({ name }) => {
    //     let filteredProffesors = []
    //     try {

    //         const proffesors = await Proffesor.find();
    //         if (proffesors.length === 0) {

    //             throw new Error('There are no proffesors yet!')
    //         }
    //         filteredProffesors = proffesors.map(p => ({ name: p.name, email: p.email }))
    //     } catch (ex) {
    //         console.log(ex.message)
    //     }
    //     return filteredProffesors
    // }
};