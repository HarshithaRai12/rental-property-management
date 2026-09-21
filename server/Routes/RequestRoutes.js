const express = require("express");
const route = express.Router();

const { addRequest, getRequests, updateRequestStatus, getMyHouse, getUserRequests} = require("../Controller/RequestController");
const auth = require("../Middleware/Auth");

// ADD REQUEST
route.post("/addrequest", auth, addRequest);

// GET ALL REQUESTS
route.get("/getrequests", getRequests);

route.put("/updatestatus/:id", updateRequestStatus);
route.get("/myhouse", auth, getMyHouse);

route.get("/myrequests", auth, getUserRequests);

module.exports = route;