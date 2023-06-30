const Campuses = require('./campuses')
const Students = require('./students')

// Each students belong to one campus
Students.belongsTo(Campuses)

module.exports = {
    Campuses,
    Students,
}