require("dotenv").config();

const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//routes...

app.use("/home", require("./router/home"));

const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.URI).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}😃`);
  });
});
