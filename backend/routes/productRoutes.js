const express = require("express")
const productRouter = express.Router()
const { upload } = require("../middlewares/multer")
const {
    shopLoginCheck, 
    userLoginCheck, 
    authorization
} = require("../middlewares/auth")
const {
    createProduct, 
    allProducts, 
    deleteProduct, 
    allProductsOfShop, 
    addReview
} = require("../controllers/productControllers")


productRouter.post("/create-product", shopLoginCheck, upload.array("images"), createProduct)
productRouter.get("/all-products-of-shop/:id", allProductsOfShop)
productRouter.get("/all-products", allProducts)
productRouter.delete("/delete-product/:id", deleteProduct)
productRouter.post("/add-product-review", userLoginCheck, addReview)

module.exports = {
    productRouter
}