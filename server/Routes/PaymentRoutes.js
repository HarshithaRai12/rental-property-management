const express = require("express");

const route = express.Router();

const {
  makePayment,
  getAllPayments,getPaymentHistory
} = require("../Controller/PaymentController");


// MAKE PAYMENT
route.post("/pay", makePayment);


// GET ALL PAYMENTS
route.get("/all", getAllPayments);

route.get("/history/:tenantName", getPaymentHistory);

module.exports = route;