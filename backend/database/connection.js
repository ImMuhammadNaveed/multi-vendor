const mongoose = require("mongoose");

console.log("🔥 connection.js loaded");

const database_url = process.env.DATABASE_URL;

// Cache the connection across serverless invocations (warm starts reuse it)
let cached = global._mongooseConnection;
if (!cached) {
    cached = global._mongooseConnection = { conn: null, promise: null };
}

async function databaseConnection() {
    if (cached.conn) {
        // Already connected (warm instance) — reuse it, don't reconnect
        return cached.conn;
    }

    if (!cached.promise) {
        console.log("🔥 databaseConnection() called — connecting");
        console.log("DATABASE_URL exists:", !!database_url);

        cached.promise = mongoose.connect(database_url, {
            bufferCommands: false, // fail fast instead of hanging 10s
        }).then((mongooseInstance) => {
            console.log("🔥 DATABASE CONNECTED");
            return mongooseInstance;
        }).catch((error) => {
            console.error("🔥 DATABASE ERROR:", error);
            cached.promise = null; // allow retry on next request
            throw error;
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

module.exports = {
    databaseConnection
};