const {DataTypes} = require('sequelize')
const db = require('../db')
const validator = require('validator')

const Students = db.define("students", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: {
        args: true,
        msg: "Invalid email address",
        isAsync: false,
      },
    },
  },
  imageUrl: {
    type: DataTypes.STRING,
    defaultValue: "Default imageUrl",
  },
  gpa: {
    type: DataTypes.DECIMAL(5,1),
    validate: {
        min: 0.0,
        max: 4.0,
    },
  },
});

module.exports = Students