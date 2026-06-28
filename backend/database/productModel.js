const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, 'please provide product name ']
    },
    description:{
        type: String,
        required: [true, 'please provide product description ']
    },
    category:{
        type: String,
        required: [true, 'please provide product category ']
    },
    tags:{
        type: String,
        required: [true, 'please enter your product tags']
    },
    originalPrice:{
        type: Number
    },
    price:{
        type: Number,
        required: [true, 'please enter product discounted price ']
    },
    stock:{
        type: Number,
        required: [true, 'please provide product stock']
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
    reviews:[
        {
            user:{
                type: Object
            },
            rating:{
                type: Number
            },
            comment: {
                type: String
            },
            productId:{
                type: String
            },
            createdAt:{
                type: Date,
                default: Date.now()
            }
        }
    ],
    ratings:{
        type: Number
    }
})
const productModel = mongoose.model("product", productSchema)



module.exports = {
    productModel
}