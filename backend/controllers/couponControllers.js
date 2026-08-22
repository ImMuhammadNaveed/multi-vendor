const { default: mongoose } = require("mongoose")
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
        const allCoupons = await couponModel.find({"shop._id": new mongoose.Types.ObjectId(shopId)})
        // console.log("all fetched coupons of the shop: ", allCoupons)
        return res.status(200).json({success: true, data: allCoupons})
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}

async function findCoupon(req, res) {
    try {
        const couponName = req.params.name
        const {cart} = req.body
        const coupon = await couponModel.findOne({name: couponName})
        if(!coupon){
            return res.status(400).json({success: false, message: "Coupon not found!"})
        }
        const eligibleItems = cart.filter((item)=>item.product.shop._id.toString()===coupon.shop._id.toString())
        if(eligibleItems.length===0){
            return res.status(400).json({success: false, message: "Coupon is not valid for these products!"})
        }
        let eligibleTotal = 0
        for (item of eligibleItems){
            eligibleTotal += item.product.price*item.quantity
        }
        const discount = (eligibleTotal/100)*coupon.value
        
        return res.status(200).json({success: true, discount: discount})
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}

async function deleteCoupon(req, res){
    try {
        const id = req.params.id
        if(!id){
            return res.status(400).json({success: false, message: "id is missing!"})
        }
        const deletedRecord = await couponModel.findByIdAndDelete(new mongoose.Types.ObjectId(id))
        if(!deletedRecord){
            return res.status(400).json({success: false, message: "deletion not happened!"})
        }
        return res.status(200).json({success: true, deletedCoupon: deletedRecord})
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}
module.exports = {
    createCoupon,
    allCoupons,
    findCoupon,
    deleteCoupon
}