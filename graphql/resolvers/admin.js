const bcrypt = require("bcryptjs");

const Admin = require("../../models/admin");
let token;
let user;
module.exports = {
  createAdmin: async ({ userInput }) => {
    try {
      const existingUser = await Admin.findOne({ email: userInput.email });
      if (existingUser) throw new Error("Admin exists already.");
      if (userInput.password.length < 1)
        return new Error("Password must be at least 1 character long.");
      const hashedPassword = await bcrypt.hash(userInput.password, 12);
      const admin = new Admin({
        email: userInput.email,
        password: hashedPassword,
        name: userInput.name,
        publicId: userInput.publicId,
        role: "Admin"
      });

      user = await admin.save();
      token = user.generateAuthToken();
    } catch (err) {
      throw err;
    }
    const admin = user.generateAdminToReturn(user, token);
    return admin;
  },
  loginAdmin: async ({ email, password }) => {
    try {
      user = await Admin.findOne({ email });
      if (!user) throw new Error("admin email doesn't exist");
      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) throw new Error("admin password doesn't exist");
      token = user.generateAuthToken();
    } catch (ex) {
      return ex.message;
    }
    const admin = user.generateAdminToReturn(user, token);
    return admin;
  },

  getAdmin: async ({ adminId }) => {
    const admin = await Admin.findById(adminId);
    return {
      userId: admin.id,
      email: admin.email,
      name: admin.name,
      token: "token",
      role: admin.role,
      publicId: admin.publicId
    };
  },
  updateAdmin: async ({ adminId, name, image, publicId }) => {
    let updatedAdmin = {};
    try {
      let admin = await Admin.findByIdAndUpdate(
        { _id: adminId },
        {
          $set: {
            name,
            publicId
          }
        },
        { new: true }
      );

      await admin.save();
      updatedAdmin = {
        userId: adminId,
        name,
        publicId,
        email: admin.email
      };
    } catch (ex) {
      console.log(ex.message);
    }

    return updatedAdmin;
  }
};
