const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const Campuses = db.define("campuses", {
  name: {
    type: DataTypes.STRING,
    allownull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    defaultValue:
      "https://e7.pngegg.com/pngimages/102/247/png-clipart-building-college-school-building-university-student-campus-text-logo.png",
  },
  address: {
    type: DataTypes.STRING,
    allownull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
});

module.exports = Campuses;
