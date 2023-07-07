const express = require('express')
const db = require('./db')
const bodyParser = require('body-parser')
const app = express()

// Mount on API 
app.use('/api', require('./api'))
app.use(bodyParser.json())

// Syncing DB Function
const syncDB = () => db.sync({ force: true });

// Run server function
const serverRun = () => {
    app.listen(process.env.PORT, () => {
        console.log(`Live on port: http://localhost:${PORT}/`);
    })
}

syncDB()
serverRun()

module.exports = app;