const express = require("express")
const conversationRouter = express.Router()

const {shopLoginCheck, userLoginCheck} = require('../middlewares/auth')
const { 
    createConversation, 
    sellerConversations, 
    getConversation, 
    userConversations,
    updateLastMessage
} = require("../controllers/conversationController")


conversationRouter.post("/create-new-conversation", createConversation)
conversationRouter.get("/get-seller-conversations", shopLoginCheck, sellerConversations)
conversationRouter.get("/get-user-conversations", userLoginCheck, userConversations)
conversationRouter.get("/get-conversation/:id", getConversation)
conversationRouter.put("/update-last-message/:id", updateLastMessage)

module.exports = {
    conversationRouter
}