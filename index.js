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

// app.use(
//   cors({
//     origin: [],

//   })
// );
// let corsOptions = {
//   origin: "*",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   optionsSuccessStatus: 200,
//   allowedHeaders: ["Content-Type", "Accept", "Authorization", "associationId"],
//   credentials: true,
// };
//app.use(cors(corsOptions));
//app.options(cors(corsOptions));
app.set("trust proxy", 1);

app.use(
  cors({
    origin: "https://suspicious-mcnulty-e79cee.netlify.app/",
    credentials: true,
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
// connect to mongoDB

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
