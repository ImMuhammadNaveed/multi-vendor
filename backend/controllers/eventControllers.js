const { eventModel } = require("../database/eventModel")
const { shopModel } = require("../database/shopModel")
const mongoose = require("mongoose")
const fs = require("fs")
const path = require("path")
const catchAsyncError = require("../middlewares/catchAsyncErrors")
const ErrorHandler = require("../utils/ErrorHandler")

const createEvent = catchAsyncError(async (req, res) => {
    try {
        // console.log("this create event controller")
        const shopId = req.shopId
        const shop = await shopModel.findById(shopId)
        if (!shop) {
            throw new ErrorHandler("shop not found!", 400)
        }
        const images = req.files || []
        const imagesNames = images.map((image) => image.filename)
        const eventData = req.body
        eventData.images = imagesNames
        eventData.shop = shop
        console.log(eventData)
        const newEvent = new eventModel(eventData)
        await newEvent.save()
        // event.save()
        return res.status(200).json({ success: true, message: "Event created!" })
    } catch (error) {
        if (req.files) {
            req.files.forEach(file => {
                console.log(file)
                const filepath = path.join(file.destination, file.filename)
                fs.unlink(filepath, (err) =>
                    console.log(err)
                )
            })
        }
        throw error
    }
})

const allEvents = catchAsyncError(async (req, res) => {
        const deletedEvents = await eventModel.deleteMany({ endingDate: { $lte: Date.now() } })
        const allEvents = await eventModel.find({})
        if (!allEvents || allEvents.length === 0) {
            throw new ErrorHandler("events not found!", 400)
        }
        return res.status(200).json({ success: true, events: allEvents })
})

const eventsOfShop = catchAsyncError(async (req, res) => {
        const events = await eventModel.find({ 'shop._id': new mongoose.Types.ObjectId(req.params.id) })
        return res.status(200).json({ success: true, data: events })
})

const deleteEvent = catchAsyncError(async (req, res) => {
        const eId = req.params.id
        const objectId = new mongoose.Types.ObjectId(eId)
        const deletedEvent = await eventModel.findByIdAndDelete(objectId)
        if (!deletedEvent) {
            throw new ErrorHandler("event not found!", 400)
        }
        deletedEvent.images.forEach(image => {
            const imagePath = image ? path.join(__dirname, "..", `/uploads/${image}`) : ""
            fs.unlink(imagePath, (err) =>
                console.log(err)
            )
        });
        res.status(200).json({ success: true, message: "event successfully deleted!" })
})


module.exports = {
    createEvent,
    allEvents,
    eventsOfShop,
    deleteEvent,
}
