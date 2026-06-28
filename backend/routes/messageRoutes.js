const express = require("express")
const messageRouter = express.Router()
const {upload} = require('../middlewares/multer')
const {createMessage, getAllMessages, messageSeen} = require('../controllers/messageController')

messageRouter.post("/create-new-message", upload.array('images'), createMessage)
messageRouter.get("/all-messages/:id", getAllMessages)
messageRouter.put("/message-seen", messageSeen)



module.exports = {
    messageRouter
}