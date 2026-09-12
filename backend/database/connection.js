const mongoose = require("mongoose");
const dns = require("dns");

console.log("🔥 connection.js loaded");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const database_url = process.env.DATABASE_URL;

function databaseConnection() {
    console.log("🔥 databaseConnection() called");
    console.log("DATABASE_URL exists:", !!database_url);

    mongoose.connect(database_url)
        .then(() => {
            console.log("🔥 DATABASE CONNECTED");
        })
        .catch((error) => {
            console.error("🔥 DATABASE ERROR:", error);
        });
}

module.exports = {
    databaseConnection
};