require("dotenv").config();

const { databaseConnection } = require("./database/connection");
const { connectToCloudinary } = require("./middlewares/cloudinary")
const app = require("./app");

const backend_port = process.env.PORT || 5000;

databaseConnection();
connectToCloudinary()

app.listen(backend_port, () => {
    console.log(`Server started on port ${backend_port}!`);
});