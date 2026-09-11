const { eventModel } = require("../database/eventModel")
const { shopModel } = require("../database/shopModel")
const mongoose = require("mongoose")
const catchAsyncError = require("../middlewares/catchAsyncErrors")
const ErrorHandler = require("../utils/ErrorHandler")
const { cloudinary } = require("../middlewares/cloudinary")
const { uploadToCloudinary } = require("../utils/cloudinaryUpload")

const createEvent = catchAsyncError(async (req, res) => {
    try {
        // console.log("this create event controller")
        const shopId = req.shopId
        const shop = await shopModel.findById(shopId)
        if (!shop) {
            throw new ErrorHandler("shop not found!", 400)
        }
        const images = req.files || []
        const uploadedImages = await Promise.all(
            images.map((image) => uploadToCloudinary(image, "multi-vendor/events"))
        )
        const eventData = req.body
        eventData.images = uploadedImages
        eventData.shop = shop
        console.log(eventData)
        const newEvent = new eventModel(eventData)
        await newEvent.save()
        // event.save()
        return res.status(200).json({ success: true, message: "Event created!" })
    } catch (error) {
        throw error
    }
})

const allEvents = catchAsyncError(async (req, res) => {
        const expiredEvents = await eventModel.find({ endingDate: { $lte: Date.now() } })
        await eventModel.deleteMany({ _id: { $in: expiredEvents.map((event) => event._id) } })
        await Promise.all(
            expiredEvents.flatMap((event) =>
                event.images
                    .filter((image) => image.public_id)
                    .map((image) => cloudinary.uploader.destroy(image.public_id))
            )
        )
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
        await Promise.all(
            deletedEvent.images
                .filter((image) => image.public_id)
                .map((image) => cloudinary.uploader.destroy(image.public_id))
        )
        res.status(200).json({ success: true, message: "event successfully deleted!" })
})


module.exports = {
    createEvent,
    allEvents,
    eventsOfShop,
    deleteEvent,
}
