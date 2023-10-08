// CREATE SERVER
const express = require("express");
require("dotenv").config();
const app = express();
const _PORT = process.env.PORT || 3001;
const MONOGODB_URL = process.env.URL;
const cors = require("cors");

app.use(cors());
app.use(express.json());

const mongoose = require("mongoose");
mongoose
.connect(MONOGODB_URL)
.then((result) => {
    console.log("*******connected to MongoDB*******");
  })
  .catch((error) => {
    console.log("Error connecting MongoDB", error.message);
  });

// MODELS

const User = require("./src/models/Users");

app.get("/", function (req, res) {
  res.send("Hello World");
});

// GET USERES
app.get("/user", async function (req, res) {
  const users = await User.find();
  res.json(users);
});

// CREATE USER
app.post("/user", async function (req, res) {
  const newUser = new User(req.body);
  await newUser.save();
  res.json(req.body);
});

app.listen(_PORT, function () {
  console.log("Server is running on port " + _PORT + ".");
});
