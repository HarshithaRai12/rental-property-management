const express = require("express");
const route = express.Router();

const { addRequest, getRequests, updateRequestStatus, getMyHouse } = require("../Controller/RequestController");
const auth = require("../Middleware/Auth");

// ADD REQUEST
route.post("/addrequest", auth, addRequest);

// GET ALL REQUESTS
route.get("/getrequests", getRequests);

route.put("/updatestatus/:id", updateRequestStatus);
route.get("/myhouse", auth, getMyHouse);

module.exports = route;