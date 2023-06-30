const {Sequelize, DataTypes} = require('sequelize')
const db = require('../db')

const Campuses = db.define('campuses', {
    name: {
        type: DataTypes.STRING,
        allownull: false,
    },
    imageUrl: {
        type: DataTypes.STRING,
        defaultValue: 'Default imageUrl',
    },
    address: {
        type: DataTypes.STRING,
        allownull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
})

module.exports = Campuses