const express = require("express")
const { createCoupon, allCoupons, findCoupon } = require("../controllers/couponControllers")
const couponRouter = express.Router()
const {shopLoginCheck} = require("../middlewares/auth")

couponRouter.post("/create-coupon", shopLoginCheck, createCoupon)
couponRouter.get("/all-coupons", shopLoginCheck, allCoupons)
couponRouter.get("/find-coupon/:name", shopLoginCheck, findCoupon)

module.exports = {
    couponRouter
}