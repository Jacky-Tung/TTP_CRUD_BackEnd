const express = require("express");
const db = require("./db");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();

// Mount on API
app.use("/api", require("./api"));
app.use(bodyParser.json());

// Syncing DB Function
const syncDB = () => db.sync();

// Run server function
const serverRun = () => {
  app.listen(process.env.PORT, () => {
    console.log(`Live on port: http://localhost:${process.env.PORT}/`);
  });
};

syncDB();
serverRun();

module.exports = app;
