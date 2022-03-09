const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorHandler");
require("express-async-errors");

dotenv.config();

// set up server

const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

app.use(express.json());
app.use(cookieParser());

app.set("trust proxy", 1);
app.use(
  cors({
    origin: "https://silly-murdock-22f721.netlify.app",
    credentials: true,
  })
);
// Add Access Control Allow Origin headers
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://silly-murdock-22f721.netlify.app"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
mongoose.connect(
  process.env.MDB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) return console.error(err);
    console.log("Connected to MongoDB");
  }
);

// set up routes

app.use("/auth", require("./routers/userRouter"));
app.use("/shipment", require("./routers/shipmentRouter"));

app.use(errorHandler);
