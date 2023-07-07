const { Sequelize } = require("sequelize");
require("dotenv").config();

const { Pool } = require("pg");

const db = new Sequelize(`${process.env.POSTGRES_URL}?sslmode=require`, {
  logging: false,
  dialect: require("pg"),
});

module.exports = db;
