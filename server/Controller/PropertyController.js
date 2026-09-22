const Property = require("../Models/PropertyModel");
const cloudinary = require("../cloudinary");

// Upload image buffer to Cloudinary
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "rentease/properties"
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      }
    );

    stream.end(fileBuffer);
  });
};


// ADD PROPERTY
const addProperty = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    // Upload all images to Cloudinary
    const imageUrls = req.files
      ? await Promise.all(
          req.files.map(file => uploadToCloudinary(file.buffer))
        )
      : [];

    const data = new Property({
      title: req.body.title,
      location: req.body.location,
      price: req.body.price,
      type: req.body.type,
      description: req.body.description,

      // Save Cloudinary URLs in MongoDB
      propertyimages: imageUrls,

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
    res.status(500).send({
      success: false,
      message: "Error adding property"
    });
  }
};


// VIEW ALL PROPERTIES
const getProperties = async (req, res) => {
  try {
    const data = await Property.find();
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching properties");
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
      bedrooms: req.body.bedrooms,
      bathrooms: req.body.bathrooms,
      area: req.body.area,
      furnishing: req.body.furnishing
    };

    // If new images are uploaded, send them to Cloudinary
    if (req.files && req.files.length > 0) {

      const imageUrls = await Promise.all(
        req.files.map(file => uploadToCloudinary(file.buffer))
      );

      updatedData.propertyimages = imageUrls;
    }

    const result = await Property.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true,
        runValidators: true
      }
    );

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
    res.status(500).send("Error deleting property");
  }
};


module.exports = {
  addProperty,
  getProperties,
  updateProperty,
  deleteProperty
};