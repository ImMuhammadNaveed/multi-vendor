const { conversationModel } = require("../database/conversationModel")
const {messageModel} = require("../database/messageModel")

async function createMessage(req, res) {
    try {
        const {conversationId, sender, text} = req.body
        let imageUrls=[]
        if(req.files){
            req.files.map((file)=>{
                imageUrls.push(file.filename)
            })
        }
        const newMessage = await messageModel.create({conversationId: conversationId, 
            sender: sender,
            text: text,
            images: imageUrls.length!==0 ?imageUrls :undefined
        })
        return res.status(200).json({success: true, message: newMessage})
    } catch (error) {
        // if message fails than delete images from uploads folder also
        return res.status(500).json({success: false, message: error.message})
    }
}

async function getAllMessages(req, res) {
    try {
        // console.log("get all messages controller: ", req.params.id)
        const messages = await messageModel.find({conversationId: req.params.id})
        if(!messages || messages.length===0){
            return res.status(400).json({success: false, message: "messages not found!"})
        }
        return res.status(200).json({success: true, messagesData: messages})
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}

async function messageSeen(req, res) {
    try {
        const {conversationId, senderId, receiverId} = req.body
        const messages = await messageModel.find({conversationId: conversationId}) 
        if(!messages || messages.length===0){
            return res.status(400).json({success: false, message: "messages not found!"})
        }
        await messageModel.updateMany({
            conversationId,
            sender: {$ne: receiverId },
            seen: false
        }, {
            $set: {seen: true}
        })
        return res.status(200).json({success: true, message: "messages successfully seen!"})
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}


module.exports = {
    createMessage,
    getAllMessages,
    messageSeen
}