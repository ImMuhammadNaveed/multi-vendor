require("dotenv").config();


const app = require("./app");

const backend_port = process.env.PORT || 5000;



app.listen(backend_port, () => {
    console.log(`Server started on port ${backend_port}!`);
});