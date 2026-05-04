const express = require("express");
const dbconnection = require("./db");
const cors = require("cors");

const app = express();
const PORTNUMBER = 7000;

// middleware
app.use(cors());
app.use(express.json());

app.use("/image", express.static("./Uploads"))

// DB connect
dbconnection();

// test route
app.get("/apitest", (req, res) => {
  res.send("Rental Property API Running...");
});

// routes (we will add later)
app.use("/property", require("./Routes/PropertyRoutes"));
app.use("/request", require("./Routes/RequestRoutes"));
app.use("/admin", require("./Routes/AdminRoutes"));
app.use("/user", require("./Routes/UserRoutes"));
// app.use("/payment", require("./Routes/PaymentRoutes"));

app.listen(PORTNUMBER, () => {
  console.log(`Server is running on port ${PORTNUMBER}`);
});