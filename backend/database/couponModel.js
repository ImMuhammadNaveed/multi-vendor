const mongoose = require("mongoose")

const couponSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, 'please provide coupon name '],
        unique: true
    },
    value:{
        type: Number,
        required: true
    },
    minAmount:{
        type: Number
    },
    maxAmount:{
        type: Number
    },
    shop:{
        type: Object,
        required: true
    },
    createAt:{
        type: Date,
        default: Date.now()
    }
})
const couponModel = mongoose.model("coupon", couponSchema)



module.exports = {
    couponModel
}