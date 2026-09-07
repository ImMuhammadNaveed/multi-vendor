const express = require("express")
const { createCoupon, shopAllCoupons, findCoupon, deleteCoupon } = require("../controllers/couponControllers")
const couponRouter = express.Router()
const { shopLoginCheck, userLoginCheck } = require("../middlewares/auth")

couponRouter.post("/create-coupon", shopLoginCheck, createCoupon)
couponRouter.get("/shop-all-coupons", shopLoginCheck, shopAllCoupons)
couponRouter.post("/find-coupon/:name", userLoginCheck, findCoupon)
couponRouter.delete("/delete-coupon/:id", shopLoginCheck, deleteCoupon)

module.exports = {
    couponRouter
}