require("dotenv").config();

const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//routes...
app.get("/", (req, res) => {
  res.render("home");
});

// app.use("/", require("./router/home"));

const PORT = process.env.PORT || 8000;

mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("Connected to MongoDB 😆");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}😃`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
