const express = require("express");
const route = express.Router();

const {
  registerAdmin,
  loginAdmin
} = require("../Controller/AdminController");

route.post("/register", registerAdmin);
route.post("/login", loginAdmin);

module.exports = route;