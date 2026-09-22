const express = require("express");
const dbconnection = require("./db");
const cors = require("cors");

const app = express();
// const PORTNUMBER = 7000;
const PORTNUMBER = process.env.PORT || 7000;  // it means:- Locally → uses 7000  while Deployed → uses the port provided by the hosting service

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
app.get("/cloudinary-test", async (req, res) => {
  try {
    const cloudinary = require("./cloudinary");

    const testImage =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIHWP4z8DwHwAFgAI/7kT5WQAAAABJRU5ErkJggg==";

    const result = await cloudinary.uploader.upload(testImage, {
      folder: "rentease/test"
    });

    console.log("CLOUDINARY TEST SUCCESS:", result.secure_url);

    res.send({
      success: true,
      message: "Cloudinary upload works",
      url: result.secure_url
    });
  } catch (error) {
    console.log("CLOUDINARY TEST ERROR:", {
      message: error.message,
      http_code: error.http_code,
      name: error.name
    });

    res.status(500).send({
      success: false,
      message: error.message,
      http_code: error.http_code
    });
  }
});
// routes (we will add later)
app.use("/property", require("./Routes/PropertyRoutes"));
app.use("/request", require("./Routes/RequestRoutes"));
app.use("/admin", require("./Routes/AdminRoutes"));
app.use("/user", require("./Routes/UserRoutes"));
app.use("/payment", require("./Routes/PaymentRoutes"));


app.listen(PORTNUMBER, () => {
  console.log(`Server is running on port ${PORTNUMBER}`);
});