const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  address: String,

  // ✅ ADD THIS
  profileImage: {
    type: String,
    default: ""
  }

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);