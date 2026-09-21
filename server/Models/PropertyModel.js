const mongoose = require("mongoose");

const propertyschema = new mongoose.Schema({
  title: { type: String },
  location: { type: String },
  price: { type: Number },
  type: { type: String }, // 1BHK, 2BHK
  description: { type: String },

  // ✅ MULTIPLE IMAGES
  propertyimages: [{ type: String }],

  bedrooms: Number,
  bathrooms: Number,
  area: Number,
  furnishing: String,

  status: {
    type: String,
    default: "available", // or rented
  },

  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
  },
});

// ✅ FIX: prevent OverwriteModelError
module.exports =
  mongoose.models.Property ||
  mongoose.model("Property", propertyschema);