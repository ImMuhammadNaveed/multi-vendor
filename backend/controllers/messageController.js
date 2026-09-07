const { conversationModel } = require("../database/conversationModel")
const { messageModel } = require("../database/messageModel")
const mongoose = require("mongoose")
const fs = require("fs")
const path = require("path")
const catchAsyncError = require("../middlewares/catchAsyncErrors")
const ErrorHandler = require("../utils/ErrorHandler")

const createMessage = catchAsyncError(async (req, res) => {
    try {
        const { conversationId, sender, text } = req.body
        let imageUrls = []
        if (req.files) {
            req.files.map((file) => {
                imageUrls.push(file.filename)
            })
        }
        console.log("image urls: ", imageUrls)
        const newMessage = await messageModel.create({
            conversationId: conversationId,
            sender: sender,
            text: text,
            images: imageUrls.length !== 0 ? imageUrls : undefined
        })
        return res.status(200).json({ success: true, message: newMessage })
    } catch (error) {
        if (req.files) {
            req.files.forEach(file => {
                const filepath = path.join(file.destination, file.filename)
                fs.unlink(filepath, (err) =>
                    console.log(err)
                )
            });
        }
        throw error
    }
})

const getAllMessages = catchAsyncError(async (req, res) => {
        // console.log("get all messages controller: ", req.params.id)
        const id = req.params.id
        const messages = await messageModel.find({ conversationId: new mongoose.Types.ObjectId(id) })
        if (!messages || messages.length === 0) {
            throw new ErrorHandler("messages not found!", 400)
        }
        return res.status(200).json({ success: true, messagesData: messages })
})

const messageSeen = catchAsyncError(async (req, res) => {
        const { conversationId, senderId, receiverId } = req.body
        const messages = await messageModel.find({ conversationId: conversationId })
        if (!messages || messages.length === 0) {
            throw new ErrorHandler("messages not found!", 400)
        }
        await messageModel.updateMany({
            conversationId,
            sender: { $ne: receiverId },
            seen: false
        }, {
            $set: { seen: true }
        })
        return res.status(200).json({ success: true, message: "messages successfully seen!" })
})


module.exports = {
    createMessage,
    getAllMessages,
    messageSeen
}
