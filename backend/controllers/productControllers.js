const { default: mongoose } = require("mongoose")
const { productModel } = require("../database/productModel")
const {shopModel} = require("../database/shopModel")

async function createProduct(req, res) {
    try {
        console.log("this create product controller")
        const shopId = req.shopId
        const shop = await shopModel.findById(shopId)
        if (!shop) {
            return res.status(400).json({ success: false, message: "shop not found!" })
        }
        const images = req.files
        // console.log("images", images)
        const imagesNames = images.map((image) => image.filename)
        // console.log(imagesNames)
        const productData = req.body
        // console.log(productData)
        productData.images = imagesNames
        productData.shop = shop
        console.log(productData)
        const newProduct = new productModel(productData)
        await newProduct.save()
        return res.status(200).json({ success: true, message: "product created!" })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

async function allProductsOfShop(req, res) {
    try {
        const shopId = req.params.id
        // console.log(typeof(shopId))
        // console.log("shop id at all-products controller: ", shopId)
        const allProducts = await productModel.find({"shop._id": new mongoose.Types.ObjectId(shopId)})
        // console.log("all fetched products of the shop: ", allProducts)
        return res.status(200).json({success: true, data: allProducts})
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

async function allProducts(req, res) {
    try {
        const allProducts = await productModel.find({})
        // console.log("all fetched products of the shop: ", allProducts)
        return res.status(200).json({success: true, data: allProducts})
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

async function deleteProduct(req, res) {
    try {
        const pId = req.body.productId
        console.log(pId)
        const deletedProduct = await productModel.deleteOne({_id: pId}).then(()=>{console.log("product deleted!")})
        if(!deletedProduct){
            return res.status(400).json({success: false, message:"product not found!"})
        }
        res.status(200).json({success: true, message:"product successfully deleted!"})
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

async function addReview(req, res) {
    try {
        const {productId, comment, rating, user} = req.body
        const product = await productModel.findById(productId)
        if(!product){
            return res.status(400).json({success: false, message: "product not found!"})
        }
        const isReviewed = product.reviews.find((rev)=>rev.user._id===req.user._id)
        if(isReviewed){
            product.reviews.forEach(element => {
                if(element.user._id === req.user._id){
                    element.comment = comment
                    element.rating = rating
                }
            })
        }else{
            product.reviews.push(req.body)
            const order = await orderModel.findById(req.body.orderId)
            if(!order){
                return res.status(400).json({ success: false, message: "order not found!" })
            }
            order.isReviewed = true
            await order.save()
        }
        let avg = 0
        product.reviews.forEach(rev=>{
            avg += rev.rating
        })
        product.ratings = avg/product.reviews.length
        await product.save()
        res.status(200).json({success: true, message: "review added successfully"})
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}
module.exports = {
    createProduct,
    allProductsOfShop,
    allProducts,
    deleteProduct,
    addReview
}