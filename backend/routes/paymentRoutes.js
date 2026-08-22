const express = require("express")
const paymentRouter = express.Router()
const {paymentProcess} = require('../controllers/paymentControllers')

paymentRouter.post('/process-payment', paymentProcess)





module.exports = {
    paymentRouter
}