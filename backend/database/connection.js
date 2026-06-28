const mongoose = require("mongoose")
require("dotenv").config()
const database_url = process.env.DATABASE_URL

function databaseConnection() {
    mongoose.connect(database_url)
        .then(() => console.log("database connected!"))
        .catch((error)=>console.log(error))
}
module.exports = {
    databaseConnection
}