const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;
const proffesorSchema = new Schema({
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

  publicId: {
    type: String
  },
  role: {
    type: String,
    required: true
  },
  registerCourses: {
    type: Array
  }
});

proffesorSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    {
      email: this.email,
      name: this.name,
      role: this.role
    },
    "unsecureKey",
    { expiresIn: "1h" }
  );
  return token;
};
proffesorSchema.methods.generateProffesorToReturn = function(proffesor, token) {
  return {
    userId: proffesor._id,
    email: proffesor.email,
    name: proffesor.name,
    token,
    role: proffesor.role,
    publicId: proffesor.publicId,
    registerCourses: proffesor.registerCourses
  };
};

proffesorSchema.methods.generateProffesorToReturnWithNoToken = function(
  proffesor
) {
  return {
    userId: proffesor._id,
    email: proffesor.email,
    name: proffesor.name,
    publicId: proffesor.publicId,
    registerCourses: proffesor.registerCourses
  };
};

module.exports = mongoose.model("Proffesor", proffesorSchema);
