const {withdrawModel} = require('../database/withdrawModel')
const {shopModel} = require("../database/shopModel")
const {sendEmail} = require("../middlewares/email")
const catchAsyncError = require("../middlewares/catchAsyncErrors")

// seller --create withdraw
const createWithdraw = catchAsyncError(async (req, res) => {
        const seller = await shopModel.findById(req.shopId)
        // console.log("seller at create withdraw: ", seller)
        const {amount} = req.body
        // console.log("amount at create withdraw: ", amount)
        seller.availableBalance = seller.availableBalance - amount
        await seller.save()
        await withdrawModel.create({amount: amount, seller: seller})
        try {
                sendEmail(seller.email, "Withdraw Request", `Hello ${seller.name}, Your withdraw request of ${amount}$ is processing. It will take 3days to 7days to processing! `)
        } catch (error) {
            console.log(error)
        }
        return res.status(200).json({success: true, message:'withdraw successfully created!'})
})

// admin --update withdraw request
const updateWithdrawRequest = catchAsyncError(async (req, res) => {
        // console.log(req.params.id)
        const withdraw = await withdrawModel.findByIdAndUpdate(req.params.id, {status: "Succeed", updatedAt: Date.now()})
        const {sellerId} = req.body
        // console.log(req.body)
        const seller = await shopModel.findById(sellerId)
        const transaction = {
            _id: withdraw._id,
            amount: withdraw.amount,
            updatedAt: withdraw.updatedAt,
            status: withdraw.status
        }
        seller.transaction = [...seller.transaction, transaction]
        await seller.save()
        sendEmail(seller.email, "Payment Confirmation!", `Hello ${seller.name}, Your withdraw request of ${withdraw.amount}$ is on the way. Delivery time depends on your bank's rules it usually takes 3days to 7days.`)
        return res.status(200).json({success: true, message: "withdraw request successfully updated!"})
})

// admin --get all withdraw requests
const getAllWithdrawRequests = catchAsyncError(async (req, res) => {
        const allWithdraws = await withdrawModel.find({}).select("-password")
        return res.status(200).json({success: true, allWithdraws: allWithdraws})
})

module.exports = {
    createWithdraw,
    updateWithdrawRequest,
    getAllWithdrawRequests
}
