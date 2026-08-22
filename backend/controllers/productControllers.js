const { default: mongoose } = require("mongoose")
const { productModel } = require("../database/productModel")
const { shopModel } = require("../database/shopModel")
const { orderModel } = require("../database/orderModel")

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
        req.files.forEach(file => {
            console.log(file)
            const filepath = path.join(file.destination +"\\"+ file.filename)
            fs.unlink(filepath, (err)=>
                console.log(err)
            )
        });
        return res.status(500).json({ success: false, message: error.message })
    }
}

async function allProductsOfShop(req, res) {
    try {
        const shopId = req.params.id
        // console.log(typeof(shopId))
        // console.log("shop id at all-products controller: ", shopId)
        const allProducts = await productModel.find({ "shop._id": new mongoose.Types.ObjectId(shopId) })
        // console.log("all fetched products of the shop: ", allProducts)
        return res.status(200).json({ success: true, data: allProducts })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

async function allProducts(req, res) {
    try {
        const allProducts = await productModel.find({})
        if (!allProducts || allProducts.length === 0) {
            return res.status(400).json({ success: false, message: "products not found!" })
        }
        return res.status(200).json({ success: true, products: allProducts })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

async function deleteProduct(req, res) {
    try {
        const pId = req.params.id
        console.log(pId)
        const objectId = new mongoose.Types.ObjectId(pId)
        console.log(objectId)
        const deletedProduct = await productModel.findByIdAndDelete(objectId)
        if (!deletedProduct) {
            return res.status(400).json({ success: false, message: "product not found!" })
        }
        if (deletedProduct.images && deletedProduct.images.length > 0) {

            for (const image of deletedProduct.images) {
                const imagePath = path.join("uploads", image)

                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath)
                }
            }
        }
        res.status(200).json({ success: true, message: "product successfully deleted!" })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

async function addReview(req, res) {
    try {
        // console.log("req.body at add revi/ews: ", req.body)
        const { productId, comment, rating, user, orderId } = req.body
        const product = await productModel.findById(productId)
        if (!product) {
            return res.status(400).json({ success: false, message: "product not found!" })
        }
        // console.log(product.reviews)
        const isReviewed = product.reviews.find(rev => rev.user._id.toString() === user._id.toString())
        console.log("isreviewed: ",isReviewed)
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