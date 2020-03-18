const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;
const studentSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  publicId: {
    type: String
  },
  registerCourses: {
    type: Array
  }
});

studentSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    {
      name: this.name,
      email: this.email,
      role: this.role
    },
    "unsecureKey",
    { expiresIn: "1h" }
  );
  return token;
};
studentSchema.methods.generateStudentToReturn = function(student, token) {
  return {
    userId: student._id,
    email: student.email,
    name: student.name,
    token,
    role: student.role,
    publicId: student.publicId,
    registerCourses: student.registerCourses
  };
};
studentSchema.methods.generateStudentToReturnWithOutToken = function(student) {
  return {
    userId: student._id,
    email: student.email,
    name: student.name,
    publicId: student.publicId,
    registerCourses: student.registerCourses
  };
};

module.exports = mongoose.model("Student", studentSchema);
