const mongoose = require("mongoose")
const { conversationModel } = require("./conversationModel")

const messageSchema = mongoose.Schema({
    conversationId:{
        type: String
    },
    sender: {
        type: String
    },
    images: {
        type: Array
    },
    text:{
        type: String
    },
    seen:{
        type: Boolean,
        default: false
    }
}, {timestamps: true})

const messageModel = mongoose.model("message", messageSchema)

module.exports = {
    messageModel
}