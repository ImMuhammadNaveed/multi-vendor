const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
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
    role: {
        type: String,
        required: true
    },
    avator: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    phoneNumber: {
        type: String
    },
    addresses:[
        {
            country:{
                type: String
            },
            city:{
                type: String
            },
            address1:{
                type: String
            },
            address2:{
                type: String
            },
            zipCode:{
                type: String
            },
            addressType:{
                type: String
            },
        }
    ]
}, {timestamps: true})
const userModel = mongoose.model("User", userSchema)

module.exports = {
    userModel
}