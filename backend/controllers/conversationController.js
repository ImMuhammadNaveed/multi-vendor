const { model, default: mongoose } = require("mongoose")
const { conversationModel } = require("../database/conversationModel")
const { messageModel } = require("../database/messageModel")
const catchAsyncError = require("../middlewares/catchAsyncErrors")
const ErrorHandler = require("../utils/ErrorHandler")

const createConversation = catchAsyncError(async (req, res) => {
    const { userId, sellerId } = req.body
    if (!userId || !sellerId) throw new ErrorHandler("userId and sellerId are required!", 400)
    const groupTitle = userId + sellerId
    const conversation = await conversationModel.findOne({ groupTitle: groupTitle })
    if (conversation) {
        return res.status(201).json({ success: true, conversationData: conversation })
    } else {
        const conversation = await conversationModel.create({ members: [userId, sellerId], groupTitle: groupTitle })
        return res.status(201).json({ success: true, conversationData: conversation })
    }
})

const sellerConversations = catchAsyncError(async (req, res) => {
    const shopId = req.shopId
    const conversations = await conversationModel.find({
        members: {
            $in: shopId
        }
    }).sort({ updatedAt: -1, createdAt: -1 })
    if (!conversations || conversations.length === 0) {
        throw new ErrorHandler("conversation not found!", 404)
    }
    return res.status(201).json({ success: true, conversationsData: conversations })
})

const userConversations = catchAsyncError(async (req, res) => {
    const conversations = await conversationModel.find({
        members: {
            $in: req.userId
        }
    })
    // console.log(conversations)
    return res.status(201).json({ success: true, conversationsData: conversations })
})

const getConversation = catchAsyncError(async (req, res) => {
    const id = req.params.id
    const conversation = await conversationModel.findById(new mongoose.Types.ObjectId(id))
    if (!conversation) {
        throw new ErrorHandler("conversation not found!", 404)
    }
    return res.status(201).json({ success: true, conversationData: conversation })
})

const updateLastMessage = catchAsyncError(async (req, res) => {
    const { lastMessage, sender } = req.body
    const id = req.params.id
    if (!lastMessage || !sender || !id) throw new ErrorHandler("lastMessage, sender and id are required!", 400)
    const conversation = await conversationModel.findByIdAndUpdate(
        new mongoose.Types.ObjectId(id),
        {
            lastMessage: lastMessage,
            lastMessageId: sender
        }
    )
    if (!conversation) throw new ErrorHandler("conversation not found!", 404)
    return res.status(201).json({ success: true, message: "last message successfully updated!" })
})

const countUnseenMessages = catchAsyncError(async (req, res) => {
    const conId = req.params.id
    const { recipient } = req.body
    const number = await messageModel.countDocuments({ conversationId: conId, seen: false, sender: { $ne: recipient } })
    return res.status(200).json({ success: true, unread: number })
})

module.exports = {
    createConversation,
    sellerConversations,
    userConversations,
    getConversation,
    updateLastMessage,
    countUnseenMessages
}
