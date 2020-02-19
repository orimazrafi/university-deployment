const Course = require('../../models/course');
const Proffesor = require('../../models/proffesor')
let filteredCourses = []
let courses;
let proffesorObject = {
    createCourse: async ({ courseInput }) => {
        let result;
        try {
            const existingCourse = await Course.findOne({ name: courseInput.name });
            if (existingCourse) return new Error('Course exists already.');
            if (courseInput.points < 1 || courseInput.points > 6) return new Error("points needs to be between 1-6.")
            if (courseInput.description.length < 5) return new Error("description must be in length of at least 5 characters.")
            if (courseInput.publicId === "") return new Error("You must upload course image.")
            let course = new Course({
                name: courseInput.name,
                description: courseInput.description,
                points: courseInput.points,
                proffesorId: courseInput.proffesorId,
                registerStudents: [],
                publicId: courseInput.publicId
            });
            result = await course.save();
            course = await Proffesor.findByIdAndUpdate(
                { _id: courseInput.proffesorId },
                { $push: { registerCourses: result._id } }, { new: true }
            )
        } catch (err) {
            throw err;
        }
        return result._id;
    },
    updateCourse: async ({ courseUpdateInput }) => {
        console.log(courseUpdateInput)
        let result;
        let course;
        try {

            course = await Course.findByIdAndUpdate({ _id: courseUpdateInput.courseId },
                {
                    $set: {
                        name: courseUpdateInput.name,
                        points: courseUpdateInput.points,
                        description: courseUpdateInput.description,
                        publicId: courseUpdateInput.publicId,
                    }
                }, { new: true }
            );
            console.log(course)
            if (!course) return new Error('problem with course updating.')



            // await course.save()
            // updatedProffesor = {
            //     userId: proffesorId,
            //     name,
            //     publicId,
            //     email: proffesor.email,
            //     registerCourses: proffesor.registerCourses
            // }
            // if (existingCourse) return new Error('Course exists already.');
            // if (courseInput.points < 1 || courseInput.points > 6) return new Error("points needs to be between 1-6.")
            // if (courseInput.description.length < 5) return new Error("description must be in length of at least 5 characters.")
            // if (courseInput.publicId === "") return new Error("You must upload course image.")
            // let course = new Course({
            //     name: courseInput.name,
            //     description: courseInput.description,
            //     points: courseInput.points,
            //     proffesorId: courseInput.proffesorId,
            //     registerStudents: [],
            //     publicId: courseInput.publicId
            // });
            // result = await course.save();
            // course = await Proffesor.findByIdAndUpdate(
            //     { _id: courseInput.proffesorId },
            //     { $push: { registerCourses: result._id } }, { new: true }
            // )
        } catch (err) {
            throw err;
        }
        console.log('courseUpdateInput', courseUpdateInput.courseId)
        return { _id: courseUpdateInput.courseId };
    },
    getProffesorCourses: async ({ proffesorId }) => {
        try {
            courses = await Course.find({ proffesorId });
            filteredCourses = courses.map(course => (
                course.generatecourseToReturn(course)
            ));

        } catch (ex) {
            return new Error(ex.message)
        }

        return filteredCourses
    },
    getCourses: async ({ studentId }) => {
        try {
            courses = await Course.find();
            if (courses.length === 0) throw new Error('There are no courses yet!')
            filteredCourses = courses.map(course => (
                course.generatecourseToReturn(course)
            ))
        } catch (ex) {
            return new Error(ex.message)
        }
        return filteredCourses
    },
    registerStudentInCourses: async ({ courseId, studentId }) => {
        try {
            course = await Course.findByIdAndUpdate(
                { _id: courseId },
                { $push: { registerStudents: studentId } }, { new: true }
            )
            courses = await Course.find()
            filteredCourses = courses.map(course => (
                course.generatecourseToReturn(course)
            )
            )

        } catch (ex) {
            return new Error(ex.message)
        }
        console.log(filteredCourses)

        return filteredCourses
    },
    removeCourse: async ({ courseId, proffesorId }) => {
        try {
            course = await Course.findByIdAndRemove(
                { _id: courseId },
                { new: true }
            )
            let proffesorList = await Proffesor.findById(
                proffesorId
            )
            if (proffesorList.length === 0) return new Error("There are no courses for this proffesor.")
            let update = proffesorList.registerCourses.filter(course => {
                return course.toString() !== courseId.toString()
            });
            await Proffesor.findByIdAndUpdate(proffesorId,
                { $set: { registerCourses: update } }, { new: true }
            )
            filteredCourses = await proffesorObject.getProffesorCourses({ proffesorId })
        } catch (ex) {
            return new Error(ex.message)
        }

        return filteredCourses
    },



};
module.exports = proffesorObject