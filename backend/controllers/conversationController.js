const { model, default: mongoose } = require("mongoose")
const { conversationModel } = require("../database/conversationModel")
const { messageModel } = require("../database/messageModel")

async function createConversation(req, res) {
    try {
        const {userId, sellerId} = req.body
        const groupTitle = userId+sellerId
        const conversation = await conversationModel.findOne({groupTitle: groupTitle})
        if(conversation){
            return res.status(200).json({success: true, conversationData: conversation})
        }else{
            const conversation = await conversationModel.create({members: [userId, sellerId], groupTitle: groupTitle})
            return res.status(200).json({success: true, conversationData: conversation})
        }
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}

async function sellerConversations(req, res) {
    try {
        const shopId = req.shopId
        const conversations = await conversationModel.find({
            members:{
                $in: shopId
            }
        }).sort({updatedAt: -1, createdAt:-1})
        if(!conversations || conversations.length===0){
            return res.status(400).json({success: false, message: "conversation not found!"})
        }
        return res.status(200).json({success: true, conversationsData: conversations})
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}

async function userConversations(req, res) {
    try {
        const conversations = await conversationModel.find({
            members: {
                $in: req.userId
            }
        })
        // console.log(conversations)
        return res.status(200).json({success: true, conversationsData: conversations})
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}

async function getConversation(req, res) {
    try {
        const id = req.params.id
        const conversation = await conversationModel.findById(new mongoose.Types.ObjectId(id))
        if(!conversation){
            return res.status(400).json({success: false, message: "conversation not found!"})
        }
        return res.status(200).json({success: true, conversationData: conversation})
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}

async function updateLastMessage(req, res){
    try {
        const {lastMessage, sender} = req.body
        const id = req.params.id
        const conversation = await conversationModel.findByIdAndUpdate(
            new mongoose.Types.ObjectId(id),
            {
                lastMessage: lastMessage,
                lastMessageId: sender
            }
        )
        return res.status(200).json({success: true, message:"last message successfully updated!"})
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}

async function countUnseenMessages(req, res) {
    try {
        const conId = req.params.id
        const {recipient} = req.body
        // console.log("unread body: ", req.body)
        const number = await messageModel.countDocuments({conversationId: conId, seen: false, sender: {$ne: recipient}})
        // console.log(number)
        return res.status(200).json({success: true, unread: number})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: error.message})
    }
}

module.exports = {
    createConversation,
    sellerConversations,
    userConversations,
    getConversation,
    updateLastMessage,
    countUnseenMessages
}