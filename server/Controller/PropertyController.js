const Property = require("../Models/PropertyModel");

// ADD PROPERTY
// const addProperty = async (req, res) => {
//   try {
//     const data = new Property({
//       title: req.body.title,
//       location: req.body.location,
//       price: req.body.price,
//       type: req.body.type,
//       description: req.body.description,
//       propertyimages: req.files.map(file => file.filename),
//       ownerId: req.body.ownerId,
//     });

//     const result = await data.save();
//     res.send(result);
//   } catch (error) {
//     console.log(error);
//     res.send("Error adding property");
//   }
// };

const addProperty = async (req, res) => {
  try {

    console.log("BODY:", req.body);
    console.log("FILES:", req.files);   // 👈 ADD THIS

    const data = new Property({
      title: req.body.title,
      location: req.body.location,
      price: req.body.price,
      type: req.body.type,
      description: req.body.description,

      propertyimages: req.files ? req.files.map(file => file.filename) : [],

      bedrooms: req.body.bedrooms,
      bathrooms: req.body.bathrooms,
      area: req.body.area,
      furnishing: req.body.furnishing,

      ownerId: req.body.ownerId,
    });

    const result = await data.save();
    res.send(result);

  } catch (error) {
    console.log(error);
    res.send("Error adding property");
  }
};
// VIEW ALL PROPERTIES
const getProperties = async (req, res) => {
  try {
    const data = await Property.find();
    res.send(data);
  } catch (error) {
    console.log(error);
    res.send("Error fetching properties");
  }
};

// UPDATE PROPERTY


const updateProperty = async (req, res) => {
  try {
    const id = req.params.rowid; // keep this only if your route is /updateproperty/:rowid

    let updatedData = {
      title: req.body.title,
      location: req.body.location,
      price: req.body.price,
      type: req.body.type,
      description: req.body.description,
      bedrooms: req.body.bedrooms,
      bathrooms: req.body.bathrooms,
      area: req.body.area,
      furnishing: req.body.furnishing
    };

    // if new image uploaded
if (req.files && req.files.length > 0) {
  updatedData.propertyimages = req.files.map(file => file.filename);
} else if (req.file) {
  updatedData.propertyimages = [req.file.filename];
} 
    const result = await Property.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true
    });

    if (!result) {
      return res.status(404).send({
        success: false,
        message: "Property not found"
      });
    }

    res.send({
      success: true,
      message: "Property updated successfully",
      data: result
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error updating property"
    });
  }
};
// DELETE PROPERTY
const deleteProperty = async (req, res) => {
  try {
    const id = req.params.rowid;

    await Property.findByIdAndDelete(id);
    res.send("Property deleted successfully");
  } catch (error) {
    console.log(error);
    res.send("Error deleting property");
  }
};

module.exports = {
  addProperty,
  getProperties,
  updateProperty,
  deleteProperty,
};