const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;
const adminSchema = new Schema({
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
  }
});
adminSchema.methods.generateAuthToken = async function() {
  const token = await jwt.sign(
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
adminSchema.methods.generateAdminToReturn = function(admin, token) {
  return {
    userId: admin.id,
    email: admin.email,
    name: admin.name,
    token,
    role: admin.role,
    userId: admin._id
  };
};
module.exports = mongoose.model("Admin", adminSchema);
