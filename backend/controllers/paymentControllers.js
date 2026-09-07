const stripe = require('stripe')(process.env.STRIPE_API_KEY)
const {couponModel} = require('../database/couponModel')
const catchAsyncError = require("../middlewares/catchAsyncErrors")

const paymentProcess = catchAsyncError(async (req, res) => {
        const {cart, couponCode} = req.body
        let totalPrice = 0
        for (const item of cart){
            totalPrice += item.product.price*item.quantity
        }
        const totalOriginalPrice = totalPrice
        if(couponCode){
            const coupon = await couponModel.findOne({ name: couponCode })
            if(coupon){
                totalPrice -= (totalPrice/100) * coupon.value
                console.log("shop total with discount: ", totalPrice)
                totalPrice += (totalOriginalPrice/100) * 10
                console.log("shop total with shipping: ", totalPrice)
            }
        }
        const myPayment = await stripe.paymentIntents.create({
            amount: totalPrice * 100,
            currency: 'USD',
            metadata: {company: "M.Naveed"}
        })
        return res.status(200).json({success: true, clientSecret: myPayment.client_secret})
})



module.exports = {
    paymentProcess
}
