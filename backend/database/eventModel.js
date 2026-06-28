const mongoose = require("mongoose")

const eventSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, 'please provide event name ']
    },
    description:{
        type: String,
        required: [true, 'please provide event description ']
    },
    category:{
        type: String,
        required: [true, 'please provide event category ']
    },
    tags:{
        type: String,
        required: [true, 'please enter your event tags']
    },
    originalPrice:{
        type: Number
    },
    price:{
        type: Number,
        required: [true, 'please enter event discounted price ']
    },
    stock:{
        type: Number,
        required: [true, 'please provide event stock']
    },
    images:[
        {
            type: String
        }
    ],
    shop:{
        type: Object,
        required: true
    },
    soldOut:{
        type: Number,
        default: 0
    },
    createAt:{
        type: Date,
        default: Date.now()
    },
    startingDate:{
        type: Date, 
        required: true
    },
    endingDate:{
        type: Date, 
        required: true
    },
    status:{
        type: String, 
        default: "running"
    }

})
const eventModel = mongoose.model("event", eventSchema)



module.exports = {
    eventModel
}