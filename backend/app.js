const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const { databaseConnection } = require("./database/connection");
const { connectToCloudinary } = require("./middlewares/cloudinary")

const { userRouter } = require("./routes/userRoutes");
const { shopRouter } = require("./routes/shopRoutes");
const { productRouter } = require("./routes/productRoutes");
const { eventRouter } = require("./routes/eventRoutes");
const { couponRouter } = require("./routes/couponRoutes");
const { orderRouter } = require("./routes/orderRoutes");
const { conversationRouter } = require("./routes/conversationRoutes");
const { messageRouter } = require("./routes/messageRoutes");
const { withdrawRouter } = require("./routes/withdrawRoutes");
const { paymentRouter } = require("./routes/paymentRoutes");

const errorHandler = require("./middlewares/error");

const app = express();

const corsOption = {
    origin: process.env.FRONTEND_URL,
    credentials: true
};

app.use(cors(corsOption));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Local uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API endpoints
app.use("/api/user", userRouter);
app.use("/api/shop", shopRouter);
app.use("/api/product", productRouter);
app.use("/api/event", eventRouter);
app.use("/api/coupon", couponRouter);
app.use("/api/order", orderRouter);
app.use("/api/conversation", conversationRouter);
app.use("/api/message", messageRouter);
app.use("/api/withdraw", withdrawRouter);
app.use("/api/payment", paymentRouter);

app.get("/", (req, res) => {
    res.send("multi-vender is running");
});

console.log("🔥 app.js loaded");
databaseConnection();
console.log("🔥 databaseConnection invoked");
connectToCloudinary();

app.use(errorHandler);

module.exports = app;