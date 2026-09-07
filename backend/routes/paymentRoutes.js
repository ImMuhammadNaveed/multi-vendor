const express = require("express")
const paymentRouter = express.Router()
const {paymentProcess} = require('../controllers/paymentControllers')
const { userLoginCheck } = require("../middlewares/auth")

paymentRouter.post('/process-payment',userLoginCheck, paymentProcess)





module.exports = {
    paymentRouter
}