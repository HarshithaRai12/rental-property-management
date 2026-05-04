const mongoose = require("mongoose");

const propertyschema = new mongoose.Schema({
  title: { type: String },
  location: { type: String },
  price: { type: Number },
  type: { type: String }, // 1BHK, 2BHK
  description: { type: String },

  propertyimage: { type: String },

  status: {
    type: String,
    default: "available", // or rented
  },

  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
  },
});

module.exports = mongoose.model("Property", propertyschema);