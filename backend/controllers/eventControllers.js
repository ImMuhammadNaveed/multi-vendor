const { eventModel } = require("../database/eventModel")
const { shopModel } = require("../database/shopModel")
const mongoose = require("mongoose")
const fs = require("fs")
const path = require("path")

async function createEvent(req, res) {
    try {
        // console.log("this create event controller")
        const shopId = req.shopId
        const shop = await shopModel.findById(shopId)
        if (!shop) {
            return res.status(400).json({ success: false, message: "shop not found!" })
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
        req.files.forEach(file => {
            console.log(file)
            const filepath = path.join(file.destination + "\\" + file.filename)
            fs.unlink(filepath, (err) =>
                console.log(err)
            )
        });
        return res.status(500).json({ success: false, message: error.message })
    }
}

async function allEvents(req, res) {
    try {
        const deletedEvents = await eventModel.deleteMany({ endingDate: { $lte: Date.now() } })
        console.log(deletedEvents)
        const allEvents = await eventModel.find({})
        if (!allEvents || allEvents.length === 0) {
            return res.status(400).json({ success: false, message: "events not found!" })
        }
        return res.status(200).json({ success: true, events: allEvents })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

async function eventsOfShop(req, res) {
    try {
        // console.log("shop id at events of shop controller: ", typeof(req.params.id))
        const events = await eventModel.find({ 'shop._id': new mongoose.Types.ObjectId(req.params.id) })
        // console.log("all fetched events of the shop: ", events)
        return res.status(200).json({ success: true, data: events })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, message: "eventsOfShop: " + error.message })
    }
}

async function deleteEvent(req, res) {
    try {
        const eId = req.params.id
        // console.log(eId)
        const objectId = new mongoose.Types.ObjectId(eId)
        // console.log(objectId)
        const deletedEvent = await eventModel.findByIdAndDelete(objectId)
        if (!deletedEvent) {
            return res.status(400).json({ success: false, message: "event not found!" })
        }
        if (deletedEvent) {
            deletedEvent.images.forEach(image => {
                // console.log(file)
                const imagePath = image ? path.join(__dirname, "..", `/uploads/${image}`) : ""
                fs.unlink(imagePath, (err) =>
                    console.log(err)
                )
            });
        }
        res.status(200).json({ success: true, message: "event successfully deleted!" })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}


module.exports = {
    createEvent,
    allEvents,
    eventsOfShop,
    deleteEvent,
}