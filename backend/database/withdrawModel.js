const mongoose = require("mongoose")

const withdrawScheme = mongoose.Schema({
    seller:{
        type: Object,
        require: true
    },
    amount:{
        type: Number,
        require: true
    },
    status:{
        type: String,
        default: "Processing"
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    updatedAt:{
        type: Date
    },
})
const withdrawModel = mongoose.model("withdraw", withdrawScheme)



module.exports = {
    withdrawModel
}