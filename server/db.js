require("dotenv").config();
const mongoose = require("mongoose");

const CONNECTION_URL = process.env.MONGO_URI;

const dbconnection = async () => {
  try {
    await mongoose.connect(CONNECTION_URL);
    console.log("Database connected successfully!!");
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbconnection;