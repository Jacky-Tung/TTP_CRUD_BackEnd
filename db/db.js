const { Sequelize } = require("sequelize");
require("dotenv").config();

const { Pool } = require("pg");

const db = new Sequelize(`${process.env.POSTGRES_URL}?sslmode=require`, {
  logging: false,
  dialect: require("pg"),
});

console.log(process.env.POSTGRES_URL);
module.exports = db;
