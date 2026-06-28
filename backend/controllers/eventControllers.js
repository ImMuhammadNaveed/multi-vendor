const {eventModel} = require("../database/eventModel")
const {shopModel} = require("../database/shopModel")
const mongoose = require("mongoose")

async function createEvent(req, res) {
    try {
        console.log("this create event controller")
        const shopId = req.shopId
        const shop = await shopModel.findById(shopId)
        if (!shop) {
            return res.status(400).json({ success: false, message: "shop not found!" })
        }
        const images = req.files
        // console.log("images", images)
        const imagesNames = images.map((image) => image.filename)
        // console.log(imagesNames)
        const eventData = req.body
        // console.log(eventData)
        eventData.images = imagesNames
        eventData.shop = shop
        console.log(eventData)
        const newEvent = new eventModel(eventData)
        await newEvent.save()
        return res.status(200).json({ success: true, message: "Event created!" })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

async function allEvents(req, res) {
    try {
        // console.log("shop id at all-events controller: ", shopId)
        const allEvents = await eventModel.find()
        // console.log("all fetched events of the shop: ", allEvents)
        return res.status(200).json({success: true, data: allEvents})
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

async function eventsOfShop(req, res) {
    try {
        // console.log("shop id at events of shop controller: ", typeof(req.params.id))
        const events = await eventModel.find({'shop._id': new mongoose.Types.ObjectId(req.params.id)})
        // console.log("all fetched events of the shop: ", events)
        return res.status(200).json({success: true, data: events})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, message: error.message })
    }
}

async function deleteEvent(req, res) {
    try {
        const pId = req.body.eventId
        console.log(pId)
        const deletedEvent = await eventModel.deleteOne({_id: pId}).then(()=>{console.log("event deleted!")})
        if(!deletedEvent){
            return res.status(400).json({success: false, message:"event not found!"})
        }
        res.status(200).json({success: true, message:"event successfully deleted!"})
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

module.exports = {
    createEvent,
    allEvents,
    eventsOfShop,
    deleteEvent
}