const Request = require("../Models/RequestModel");
const Property = require("../Models/PropertyModel");

// ADD REQUEST
// const addRequest = async (req, res) => {
//   try {

//     // this prevents duplicate
//     const existingRequest = await Request.findOne({
//       propertyId: req.body.propertyId,
//       user: req.user.id
//     });

//     if (existingRequest) {
//       return res.status(400).send({
//         success: false,
//         message: "You have already requested this property"
//       });
//     }
//     if (property.status === "rented") {
//   return res.status(400).send({
//     success: false,
//     message: "Property already rented"
//   });
// }
//     // 👇 THIS WAS YOUR ORIGINAL CODE (leave it as it is)
//     const data = new Request({
//       propertyId: req.body.propertyId,
//       tenantName: req.body.tenantName,
//       user: req.user.id
//     });

//     const result = await data.save();

//     res.send({
//       success: true,
//       message: "Request added successfully",
//       data: result
//     });

//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error adding request"
//     });
//   }
// };



const addRequest = async (req, res) => {
  try {

    const existingRequest = await Request.findOne({
      propertyId: req.body.propertyId,
      user: req.user.id
    });

    if (existingRequest) {
      return res.status(400).send({
        success: false,
        message: "You have already requested this property"
      });
    }

    const property = await Property.findById(req.body.propertyId);

    // ✅ FIXED BLOCK
    if (!property) {
      return res.status(404).send({
        success: false,
        message: "Property not found"
      });
    }

    if (property.status === "rented") {
      return res.status(400).send({
        success: false,
        message: "Property already rented"
      });
    }

    const data = new Request({
      propertyId: req.body.propertyId,
      tenantName: req.body.tenantName,
      user: req.user.id
    });

    const result = await data.save();

    res.send({
      success: true,
      message: "Request added successfully",
      data: result
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error adding request"
    });
  }
};


// GET ALL REQUESTS
const getRequests = async (req, res) => {
  try {
    const data = await Request.find().populate("propertyId");
    res.send(data);
  } catch (error) {
    console.log(error);
    res.send("Error fetching requests");
  }
};

// UPDATE REQUEST STATUS
const updateRequestStatus = async (req, res) => {
  try {
    const id = req.params.id;

    const updated = await Request.findByIdAndUpdate(
      id,
      { status: req.body.status },
      { new: true }
    );

    // ✅ ADD THIS BLOCK
  if (req.body.status === "approved") {
  await Property.findByIdAndUpdate(
    updated.propertyId,
    { status: "rented" }
  );
}

if (req.body.status === "rejected") {
  await Property.findByIdAndUpdate(
    updated.propertyId,
    { status: "available" }
  );
}

    res.send(updated);
  } catch (error) {
    console.log(error);
    res.send("Error updating request");
  }
};

// 🏠 GET MY HOUSE (APPROVED PROPERTY)
const getMyHouse = async (req, res) => {
  try {

    const data = await Request.find({
      user: req.user.id,
      status: "approved"
    }).populate("propertyId");

    res.send({
      success: true,
      data: data
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching house"
    });
  }
};

module.exports = {
  addRequest,
  getRequests,
  updateRequestStatus,
  getMyHouse 
};