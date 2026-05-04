const Property = require("../Models/PropertyModel");

// ADD PROPERTY
const addProperty = async (req, res) => {
  try {
    const data = new Property({
      title: req.body.title,
      location: req.body.location,
      price: req.body.price,
      type: req.body.type,
      description: req.body.description,
      propertyimage: req.file?.filename,
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
    const id = req.params.rowid;

    let updatedData = {
      title: req.body.title,
      location: req.body.location,
      price: req.body.price,
      type: req.body.type,
      description: req.body.description,
    };

    // if new image uploaded
    if (req.file) {
      updatedData.propertyimage = req.file.filename;
    }

    const result = await Property.findByIdAndUpdate(id, updatedData, { new: true });

    res.send(result);
  } catch (error) {
    console.log(error);
    res.send("Error updating property");
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