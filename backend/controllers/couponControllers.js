const {couponModel} = require("../database/couponModel") 
const {shopModel} = require("../database/shopModel")

async function createCoupon(req, res) {
    try {
        const name = req.body.name
        const coupon = await couponModel.findOne({name: name})
        if(coupon){
            return res.status(400).json({success: false, message: "coupon already exists!"})
        }
        const shopId = req.shopId
        // console.log(shopId)
        const shop = await shopModel.findById(shopId)
        // consosle.log(shop)
        const couponData = {...req.body, shop}
        couponData.shop = shop
        console.log("coupon data :", couponData)
        
        const newCoupon = new couponModel(couponData)
        await newCoupon.save()
        return res.status(200).json({success: true, message: "coupon successfully created!"})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({success: false, message: error.message})
    }
}

async function allCoupons(req, res) {
    try {
        const shopId = req.shopId
        console.log("shop id at all-coupons controller: ", shopId)
        const allCoupons = await couponModel.find({shopId: shopId})
        console.log("all fetched products of the shop: ", allCoupons)
        return res.status(200).json({success: true, data: allCoupons})
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}

async function findCoupon(req, res) {
    try {
        const couponName = req.params.name
        // console.log(couponName)
        const coupon = await couponModel.findOne({name: couponName})
        // console.log(coupon)
        if(!coupon){
            return res.status(400).json({success: false, message: "Coupon not found!"})
        }
        return res.status(200).json({success: true, data: coupon})
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}
module.exports = {
    createCoupon,
    allCoupons,
    findCoupon
}