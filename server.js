// DEPENDENCIES
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

// PORT
const PORT = process.env.PORT || 3000;

// EXPRESS
const app = express();

app.use(logger("dev"));

// EXPRESS ENCODING
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// EXPRESS VIEW
app.use(express.static("public"));

// MONGODB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budget", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// ROUTES
app.use(require("./routes/api.js"));

// SERVER LISTEN
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});