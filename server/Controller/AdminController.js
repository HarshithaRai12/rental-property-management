const jwt = require("jsonwebtoken");
const SECRET_KEY = "product-crud";
const Admin = require("../Models/AdminModel");

// REGISTER ADMIN
const registerAdmin = async (req, res) => {
  try {
    const data = new Admin(req.body);
    await data.save();

    res.send({
      success: true,
      message: "Admin Registered Successfully"
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: "Error"
    });
  }
};

// LOGIN ADMIN
const loginAdmin = async (req, res) => {
  try {
    const admin = await Admin.findOne({
      email: req.body.email,
      password: req.body.password
    });

    if (admin) {

      const token = jwt.sign(
        { id: admin._id },
        SECRET_KEY
      );

      res.send({
        success: true,
        message: "Login Success",
        token: token
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

module.exports = {
  registerAdmin,
  loginAdmin
};