const mongoose = require("mongoose")
const conversationSchema = mongoose.Schema({
    members:{
        type: Array
    },
    groupTitle:{
        type: String
    },
    lastMessage:{
        type: String
    },
    lastMessageId: {
        type: String
    }
}, {timestamps: true})

const conversationModel = mongoose.model("conversation", conversationSchema)



module.exports = {
    conversationModel
}





























