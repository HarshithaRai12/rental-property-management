const express = require("express");
const route = express.Router();

const {
  addProperty,
  getProperties,
  updateProperty,
  deleteProperty,
} = require("../Controller/PropertyController");

const upload = require("../Middleware/imageupload");

// ADD PROPERTY
route.post("/addproperty", upload.single("propertyimage"), addProperty);

// GET ALL PROPERTIES
route.get("/getproperties", getProperties);

// UPDATE PROPERTY
route.put("/updateproperty/:rowid", upload.single("propertyimage"), updateProperty);

// DELETE PROPERTY
route.delete("/deleteproperty/:rowid", deleteProperty);

module.exports = route;