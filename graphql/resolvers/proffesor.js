const bcrypt = require('bcryptjs');
const Proffesor = require('../../models/proffesor');
const Course = require('../../models/course');
let token;
let user;
var mongoose = require('mongoose');
module.exports = {
    createProffesor: async ({ proffesorInput }) => {
        try {
            const existingUser = await Proffesor.findOne({ email: proffesorInput.email });
            if (existingUser) return new Error('User exists already.');
            if (proffesorInput.password.length < 1) return new Error('Password must be at least 1 character long.')
            const hashedPassword = await bcrypt.hash(proffesorInput.password, 12);
            const proffesor = new Proffesor({
                publicId: "default_avatar_k049ck",
                email: proffesorInput.email,
                password: hashedPassword,
                name: proffesorInput.name,
                role: "Proffesor",
                registerCourses: [],

            });

            user = await proffesor.save();
            token = proffesor.generateAuthToken();
        } catch (err) {
            throw err;
        }
        const proffesor = user.generateProffesorToReturn(user, token)
        return proffesor

    },
    loginProffesor: async ({ email, password }) => {
        try {
            user = await Proffesor.findOne({ email });
            if (!user) throw new Error("Proffesor email doesn't exist");
            const isEqual = await bcrypt.compare(password, user.password);
            if (!isEqual) throw new Error("user password doesn't exist");
            token = user.generateAuthToken()
        } catch (ex) {
            throw new Error(ex.message)
        }
        const student = user.generateProffesorToReturn(user, token)
        return student
    },
    proffesorsList: async ({ name }) => {
        let filteredProffesors = []
        try {
            const proffesors = await Proffesor.find();
            if (proffesors.length === 0) throw new Error('There are no proffesors yet!')
            filteredProffesors =
                proffesors.
                    map(proffesor =>
                        proffesor.generateProffesorToReturnWithNoToken(proffesor)
                    )
        } catch (ex) {
            return new Error(ex.message)
        }
        return filteredProffesors
    },
    getProffesorRegisterCourses: async ({ name }) => {
        let proffesorAndCourses = [];
        try {
            const proffesors = await Proffesor.find()
            const courses = await Course.find()
            proffesors.forEach(async (proffesor) => {
                proffesor.registerCourses.forEach(async (p) => {
                    courses.forEach(course => {
                        if (p.toString() === course._id.toString()) {
                            proffesorAndCourses.unshift(
                                { courseId: course._id, name: course.name, proffesorId: proffesor._id }
                            )
                        }
                    });
                })

            });
        } catch (ex) {
            return new Error(ex.message)
        }
        return proffesorAndCourses
    },
    getProffesor: async ({ proffesorId }) => {
        try {

            user = await Proffesor.findById(proffesorId);
            if (!user) return new Error("There is no Proffesor with that id.")
        } catch (ex) {
            return new Error(ex.message)
        }
        const proffesor = user.generateProffesorToReturnWithNoToken(user)
        return proffesor

    },
    updateProffesor: async ({ proffesorId, name, image, publicId }) => {
        let updatedProffesor = {}
        try {

            let proffesor = await Proffesor.findByIdAndUpdate(
                { _id: proffesorId },
                {
                    $set: {
                        name,
                        imageName: image,
                        publicId,
                    }
                }, { new: true }
            )

            await proffesor.save()
            updatedProffesor = {
                userId: proffesorId,
                name,
                publicId,
                email: proffesor.email,
                registerCourses: proffesor.registerCourses
            }


        } catch (ex) {
            return new Error(ex.message)
        }

        return updatedProffesor
    },


};