const express = require("express")
const eventRouter = express.Router()
const { upload } = require("../middlewares/multer")
const {
    shopLoginCheck, 
    userLoginCheck, 
    authorization
} = require("../middlewares/auth")
const {
    createEvent, 
    allEvents, 
    deleteEvent, 
    eventsOfShop
} = require("../controllers/eventControllers")


eventRouter.post("/create-event", shopLoginCheck, upload.array("images"), createEvent)
eventRouter.get("/all-events", allEvents)
eventRouter.get("/events-of-shop/:id", shopLoginCheck, eventsOfShop)
eventRouter.delete("/delete-event/:id", shopLoginCheck, deleteEvent)

module.exports = {
    eventRouter
}