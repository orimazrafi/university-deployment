const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const courseSchema = new Schema({
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
    proffesorId: {
        type: String,
        required: true

    }

})

module.exports = mongoose.model('Course', courseSchema)