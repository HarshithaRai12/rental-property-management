const express = require("express");
const route = express.Router();

const {
  addProperty,
  getProperties,
  updateProperty,
  deleteProperty,
} = require("../Controller/PropertyController");

const upload = require("../Middleware/imageupload");
const Property = require("../Models/PropertyModel");

// ================================
// ADD PROPERTY (MULTIPLE IMAGES)
// ================================
route.post(
  "/addproperty",
  upload.array("propertyimages", 5),   // ✅ MUST MATCH FRONTEND NAME
  addProperty
);

// ================================
// GET ALL PROPERTIES
// ================================
route.get("/getproperties", getProperties);

// ================================
// UPDATE PROPERTY (MULTIPLE IMAGES)
// ================================
route.put(
  "/updateproperty/:rowid",
  upload.array("propertyimages", 5),   // ✅ CHANGED
  updateProperty
);

// ================================
// DELETE PROPERTY
// ================================
route.delete("/deleteproperty/:rowid", deleteProperty);

// ================================
// GET SINGLE PROPERTY BY ID
// ================================
route.get("/getproperty/:id", async (req, res) => {
  try {
    const data = await Property.findById(req.params.id);
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching property");
  }
});

module.exports = route;