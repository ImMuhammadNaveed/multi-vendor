const express = require("express")
const eventRouter = express.Router()
const { upload } = require("../middlewares/multer")
const {shopLoginCheck} = require("../middlewares/auth")
const {createEvent, allEvents, deleteEvent, eventsOfShop} = require("../controllers/eventControllers")


eventRouter.post("/create-event", shopLoginCheck, upload.array("images"), createEvent)
eventRouter.get("/all-events", allEvents)
eventRouter.get("/events-of-shop/:id", eventsOfShop)
eventRouter.post("/delete-event", deleteEvent)
module.exports = {
    eventRouter
}