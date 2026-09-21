// const mongoose = require("mongoose");

// const paymentSchema = new mongoose.Schema({

//   tenantId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Tenant"
//   },

//   propertyId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Property"
//   },

//   tenantName: {
//     type: String
//   },

//   propertyName: {
//     type: String
//   },

//   amount: {
//     type: Number,
//     required: true
//   },

//   paymentMethod: {
//     type: String,
//     required: true
//   },

//   transactionId: {
//   type: String,
//   unique: true
// },

//   status: {
//     type: String,
//     default: "Paid"
//   },

//   paymentDate: {
//     type: Date,
//     default: Date.now
//   },
  

// });

// module.exports = mongoose.model("Payment", paymentSchema);

const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({

  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tenant"
  },

  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property"
  },

  tenantName: {
    type: String
  },

  propertyName: {
    type: String
  },

  amount: {
    type: Number,
    required: true
  },

  paymentMethod: {
    type: String,
    required: true
  },

  // CARD DETAILS
  cardHolderName: {
    type: String
  },

  cardNumber: {
    type: String
  },

  expiryDate: {
    type: String
  },

  cvv: {
    type: String
  },

  transactionId: {
    type: String,
    unique: true
  },

  status: {
    type: String,
    default: "Paid"
  },

  paymentDate: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Payment", paymentSchema);