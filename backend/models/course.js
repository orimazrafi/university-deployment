const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const courseSchema = new Schema({
    courseId: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    publicId: {
        type: String,
    },
    proffesorId: {
        type: String,
        required: true
    },
    registerStudents: {
        type: Array
    }

})

courseSchema.methods.generatecourseToReturn = function (course) {
    return {
        courseId: course._id,
        name: course.name,
        points: course.points,
        description: course.description,
        proffesorId: course.proffesorId,
        registerStudents: course.registerStudents,
        publicId: course.publicId
    };
};

module.exports = mongoose.model('Course', courseSchema)