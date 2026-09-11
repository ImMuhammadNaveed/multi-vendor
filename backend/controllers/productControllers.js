const { default: mongoose } = require("mongoose")
const { productModel } = require("../database/productModel")
const { shopModel } = require("../database/shopModel")
const { orderModel } = require("../database/orderModel")
const catchAsyncError = require("../middlewares/catchAsyncErrors")
const ErrorHandler = require("../utils/ErrorHandler")
const { cloudinary } = require("../middlewares/cloudinary")
const { uploadToCloudinary } = require("../utils/cloudinaryUpload")

const createProduct = catchAsyncError(async (req, res) => {
    console.log("this create product controller")
    const shopId = req.shopId
    const shop = await shopModel.findById(shopId)
    if (!shop) {
        throw new ErrorHandler("shop not found!", 400)
    }
    const images = req.files || []
    const uploadedImages = await Promise.all(
        images.map(async (image) => {
            return uploadToCloudinary(image, "multi-vendor/products")
        })
    )
    const productData = req.body
    productData.images = uploadedImages
    productData.shop = shop
    console.log(productData)
    const newProduct = new productModel(productData)
    await newProduct.save()
    return res.status(200).json({ success: true, message: "product created!" })
})

const allProductsOfShop = catchAsyncError(async (req, res) => {
    const shopId = req.params.id
    // console.log(typeof(shopId))
    // console.log("shop id at all-products controller: ", shopId)
    const allProducts = await productModel.find({ "shop._id": new mongoose.Types.ObjectId(shopId) })
    // console.log("all fetched products of the shop: ", allProducts)
    return res.status(200).json({ success: true, data: allProducts })
})

const allProducts = catchAsyncError(async (req, res) => {
    console.log("all products trigered")
    const allProducts = await productModel.find({})
    if (!allProducts || allProducts.length === 0) {
        throw new ErrorHandler("products not found!", 400)
    }
    return res.status(200).json({ success: true, products: allProducts })
})

const deleteProduct = catchAsyncError(async (req, res) => {
    const pId = req.params.id
    console.log(pId)
    const objectId = new mongoose.Types.ObjectId(pId)
    console.log(objectId)
    const deletedProduct = await productModel.findByIdAndDelete(objectId)
    if (!deletedProduct) {
        throw new ErrorHandler("product not found!", 400)
    }
    if (deletedProduct.images && deletedProduct.images.length > 0) {
        await Promise.all(
            deletedProduct.images.filter((image) => image.public_id).map(async (image) =>
                await cloudinary.uploader.destroy(image.public_id)
            )
        )
    }
    res.status(200).json({
        success: true,
        message: "product successfully deleted!"
    })
})

const addReview = catchAsyncError(async (req, res) => {
    // console.log("req.body at add revi/ews: ", req.body)
    const { productId, comment, rating, user, orderId } = req.body
    const product = await productModel.findById(productId)
    if (!product) {
        throw new ErrorHandler("product not found!", 400)
    }
    // console.log(product.reviews)
    const isReviewed = product.reviews.find(rev => rev.user._id.toString() === user._id.toString())
    console.log("isreviewed: ", isReviewed)
    if (isReviewed) {
        product.reviews.forEach(element => {
            if (element.user._id === user._id) {
                element.comment = comment
                element.rating = rating
                element.user = user
                console.log(true)
            }
        })
    } else {
        product.reviews.push({ user, rating, comment, productId })
    }
    const order = await orderModel.findById(orderId)
    const cart = order.cart.find(
        item => item.product._id.toString() === productId
    );
    // console.log("cart :", cart)
    if (cart) {
        cart.isReviewed = true
        console.log("cart :", cart)
        order.markModified("cart");
        await order.save()
    }
    let avg = 0
    product.reviews.forEach(rev => {
        avg += rev.rating
    })
    product.ratings = avg / product.reviews.length
    await product.save()
    res.status(200).json({ success: true, message: "review added successfully" })
})


module.exports = {
    createProduct,
    allProductsOfShop,
    allProducts,
    deleteProduct,
    addReview
}
