const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
  },
  tenantName: {
    type: String,
  },
  user: {   // ✅ NEW FIELD
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  status: {
    type: String,
    default: "pending", // pending, approved, rejected
  },
});

module.exports = mongoose.model("Request", requestSchema);