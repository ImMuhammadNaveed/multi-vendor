const express = require("express")
const { createOrder, 
    getUserOrders, 
    orderDetails, 
    getSellerOrders, 
    updateOrderStatus, 
    refund,
    refundSuccess
} = require("../controllers/orderController")

const { userLoginCheck, 
    shopLoginCheck 
} = require("../middlewares/auth")

const orderRouter = express.Router()

orderRouter.post("/create-order", createOrder)
orderRouter.get("/user-orders", userLoginCheck, getUserOrders)
orderRouter.get("/order-details/:id", userLoginCheck, orderDetails)
orderRouter.get("/seller-orders", shopLoginCheck, getSellerOrders)
orderRouter.post("/update-order-status/:id",  updateOrderStatus)
orderRouter.post("/process-refund/:id", refund)
orderRouter.post("/refund-success/:id", refundSuccess)


module.exports = {
    orderRouter
}