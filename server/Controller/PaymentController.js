const Payment = require("../Models/PaymentModel");


// MAKE PAYMENT
const makePayment = async (req, res) => {

  try {

    const payment = new Payment({
      ...req.body,
      transactionId: "TXN" + Date.now()
    });

    await payment.save();

    res.send({
      success: true,
      message: "Payment Successful",
      data: payment
    });

  } catch (error) {

    console.log(error);

    res.send({
      success: false,
      message: "Payment Failed"
    });

  }

};


// GET ALL PAYMENTS
const getAllPayments = async (req, res) => {

  try {

    const payments = await Payment.find()
      .sort({ paymentDate: -1 });

    res.send({
      success: true,
      data: payments
    });

  } catch (error) {

    console.log(error);

    res.send({
      success: false,
      message: "Error fetching payments"
    });

  }

};

// GET PAYMENT HISTORY BY TENANT
const getPaymentHistory = async (req, res) => {

  try {

    const payments = await Payment.find({
      tenantName: req.params.tenantName
    }).sort({ paymentDate: -1 });

    res.send({
      success: true,
      data: payments
    });

  } catch (error) {

    console.log(error);

    res.send({
      success: false,
      message: "Error fetching payment history"
    });

  }

};
module.exports = {
  makePayment,
  getAllPayments,
  getPaymentHistory
};