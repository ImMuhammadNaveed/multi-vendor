const express = require("express")
const productRouter = express.Router()
const { upload } = require("../middlewares/multer")
const {shopLoginCheck} = require("../middlewares/auth")
const {createProduct, allProducts, deleteProduct, allProductsOfShop, addReview} = require("../controllers/productControllers")


productRouter.post("/create-product", shopLoginCheck, upload.array("images"), createProduct)
productRouter.get("/all-products-of-shop/:id", allProductsOfShop)
productRouter.get("/all-products", allProducts)
productRouter.post("/delete-product", deleteProduct)
productRouter.post("/add-product-review", addReview)

module.exports = {
    productRouter
}