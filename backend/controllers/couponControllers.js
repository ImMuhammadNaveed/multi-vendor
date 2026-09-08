const { default: mongoose } = require("mongoose")
const { couponModel } = require("../database/couponModel")
const { shopModel } = require("../database/shopModel")
const catchAsyncError = require('../middlewares/catchAsyncErrors')
const ErrorHandler = require("../utils/ErrorHandler")

const createCoupon = catchAsyncError(async (req, res) => {
    const name = req.body.name
    if(!name) throw new ErrorHandler("coupon name is reqired!", 400)
    const coupon = await couponModel.findOne({ name: name })
    if (coupon) {
        throw new ErrorHandler("coupon already exists!", 400)
    }
    const shopId = req.shopId
    const shop = await shopModel.findById(shopId)
    const couponData = { ...req.body, shop }

    let newCoupon = new couponModel(couponData)
    newCoupon = await newCoupon.save()
    return res.status(200).json({ success: true, newCoupon: newCoupon })
})

const shopAllCoupons = catchAsyncError(async (req, res) => {
    const shopId = req.shopId
    if(!shopId) throw new ErrorHandler("shop id is reqired!", 400)
    const allCoupons = await couponModel.find({ "shop._id": new mongoose.Types.ObjectId(shopId) })
    return res.status(200).json({ success: true, data: allCoupons })
})

const findCoupon = catchAsyncError(async (req, res) => {
    const couponName = req.params.name
    const { cart } = req.body
    const coupon = await couponModel.findOne({ name: couponName })
    if (!coupon) {
        throw new ErrorHandler("coupon not found!", 404)
    }
    const eligibleItems = cart.filter((item) => item.product.shop._id.toString() === coupon.shop._id.toString())
    if (eligibleItems.length === 0) {
        throw new ErrorHandler("coupon is not valid for these products!", 400)
    }
    let eligibleTotal = 0
    for (item of eligibleItems) {
        eligibleTotal += item.product.price * item.quantity
    }
    const discount = (eligibleTotal / 100) * coupon.value

    return res.status(200).json({ success: true, discount: discount })
})

const deleteCoupon = catchAsyncError(async (req, res) => {
    const id = req.params.id
    if (!id) {
        throw new ErrorHandler("coupon id is reqired!", 400)
    }
    const deletedRecord = await couponModel.findByIdAndDelete(new mongoose.Types.ObjectId(id))
    if (!deletedRecord) {
        throw new ErrorHandler("deletion not happened!", 400)
    }
    return res.status(200).json({ success: true, deletedCoupon: deletedRecord })
})


module.exports = {
    createCoupon,
    shopAllCoupons,
    findCoupon,
    deleteCoupon
}