const express = require("express")
const { createOrder, 
    getUserOrders, 
    orderDetails, 
    getSellerOrders, 
    updateOrderStatus, 
    refund,
    refundSuccess,
    getAllOrders
} = require("../controllers/orderController")

const { 
    userLoginCheck, 
    shopLoginCheck,
    authorization
} = require("../middlewares/auth")

const orderRouter = express.Router()

orderRouter.post("/create-order", userLoginCheck, createOrder)
orderRouter.get("/user-orders", userLoginCheck, getUserOrders)
orderRouter.get("/order-details/:id", orderDetails)
orderRouter.get("/seller-orders", shopLoginCheck, getSellerOrders)
orderRouter.post("/update-order-status/:id", shopLoginCheck, updateOrderStatus)
orderRouter.post("/process-refund/:id", userLoginCheck, refund)
orderRouter.post("/refund-success/:id", shopLoginCheck, refundSuccess)
orderRouter.get("/all-orders", userLoginCheck, authorization(["Admin"]), getAllOrders)

module.exports = {
    orderRouter
}