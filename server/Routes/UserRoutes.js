const express = require("express");
const route = express.Router();

const {
  registerUser,
  loginUser,
  getProfile
} = require("../Controller/UserController");

const auth = require("../Middleware/Auth");

// REGISTER
route.post("/register", registerUser);

// LOGIN
route.post("/login", loginUser);

// PROFILE ✅
route.get("/getprofile", auth, getProfile);

module.exports = route;