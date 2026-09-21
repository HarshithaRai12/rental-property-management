const express = require("express");
const route = express.Router();

const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  uploadProfileImage
} = require("../Controller/UserController");

const auth = require("../Middleware/Auth");

// 🔥 multer
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// ROUTES
route.post("/register", registerUser);
route.post("/login", loginUser);

route.get("/getprofile", auth, getProfile);
route.put("/updateprofile", auth, updateProfile);

// ✅ NEW IMAGE ROUTE
route.put("/uploadprofileimage", auth, upload.single("image"), uploadProfileImage);

module.exports = route;