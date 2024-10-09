const express = require("express");
const cors = require("cors");
const { StatusCodes } = require("http-status-codes");
const { connectDb } = require("./db/config");

require("dotenv").config();

const PORT = process.env.PORT;

const app = express();

//bodyparser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//cors call

app.use(cors());

//index route

app.get(`/`, async (req, res) => {
  res
    .status(StatusCodes.OK)
    .json({ status: true, msg: "Welcome to Auth Controller" });
});

//route
app.use(`/api/auth`, require("./route/authRoute"));

//deafult path route

app.all(`*`, async (req, res) => {
  res
    .status(StatusCodes.NOT_FOUND)
    .json({ status: false, msg: "Requested Path Not Found" });
});

//listener

app.listen(PORT, () => {
  if(process.env.MODE=== "production"){
    connectDb(process.env.MONGO_PROD)
  }

  if(process.env.MODE=== "development"){
    connectDb(process.env.MONGO_DEV)
  }
  console.log(`server is statrted and running at @http://localhost:${PORT}`);
});
