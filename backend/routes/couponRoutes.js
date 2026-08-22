const express = require("express")
const { createCoupon, allCoupons, findCoupon, deleteCoupon } = require("../controllers/couponControllers")
const couponRouter = express.Router()
const { shopLoginCheck, userLoginCheck } = require("../middlewares/auth")

couponRouter.post("/create-coupon", shopLoginCheck, createCoupon)
couponRouter.get("/all-coupons", shopLoginCheck, allCoupons)
couponRouter.post("/find-coupon/:name", userLoginCheck, findCoupon)
couponRouter.delete("/delete-coupon/:id", shopLoginCheck, deleteCoupon)

module.exports = {
    couponRouter
}