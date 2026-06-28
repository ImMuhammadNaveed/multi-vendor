const mongoose = require("mongoose")

const shopSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        default:"seller"
    },
    avator: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    description: {
        type: String
    },
    resetPasswordToken: {
        type: String
    },
    restPasswordTime: {
        type: Date
    },
}, {timestamps: true})
const shopModel = mongoose.model("Shop", shopSchema)

module.exports = {
    shopModel
}