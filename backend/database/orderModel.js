const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    cart:{
        type: Array,
        required: true
    },
    shippingAddress:{
        type: Object,
        required: true
    },
    user: {
        type: Object,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: "processing"
    },
    isReviewed:{
        type: Boolean,
        default: false
    },
    paymentInfo:{
        id: {
            type: String
        },
        status:{
            type: String
        },
        type:{
            type: String
        }
    },
    paidAt:{
        type: Date,
        default: Date.now()
    },
    deliveredAt:{
        type: Date,
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

const orderModel = mongoose.model("order", orderSchema)




module.exports = {
    orderModel
}