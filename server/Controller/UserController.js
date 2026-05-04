const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "product-crud";

// REGISTER
const registerUser = async (req, res) => {
  try {

    const existing = await User.findOne({
      email: req.body.email
    });

    if (existing) {
      return res.send({
        success: false,
        message: "Email already exists"
      });
    }

    const data = new User(req.body);
    await data.save();

    res.send({
      success: true,
      message: "Registered Successfully"
    });

  } catch (error) {
    console.log(error);
  }
};

// LOGIN
const loginUser = async (req, res) => {
  try {

    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password
    });

    if (user) {

      const token = jwt.sign(
        { id: user._id, name: user.name },
        SECRET_KEY
      );

      res.send({
        success: true,
        token: token,
        username: user.name
      });

    } else {
      res.send({
        success: false,
        message: "Invalid Credentials"
      });
    }

  } catch (error) {
    console.log(error);
  }
};

const getProfile = async (req, res) => {
  try {
    console.log("Decoded user:", req.user); // 🔥 DEBUG

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found"
      });
    }

    res.send({
      success: true,
      udata: user
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching profile"
    });
  }
}; 

module.exports = {
  registerUser,
  loginUser,
  getProfile
};