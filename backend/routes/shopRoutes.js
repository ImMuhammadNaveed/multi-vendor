const express = require("express")
const shopRouter = express.Router()
const {upload} = require('../middlewares/multer')
const {shopLoginCheck} = require('../middlewares/auth')
const {createShop, activateShop, loginShop, info, logout, getSeller, updateSeller} = require('../controllers/shopControllers')

shopRouter.post('/create-shop', upload.single('image'), createShop)
shopRouter.post('/verify-shop', activateShop)
shopRouter.post('/login-shop', loginShop)
shopRouter.get('/info-shop/:id', info)
shopRouter.get('/get-seller', shopLoginCheck, getSeller)
shopRouter.post('/logout', shopLoginCheck, logout)
shopRouter.post('/update-seller', shopLoginCheck, upload.single('image'), updateSeller)

module.exports = {
    shopRouter
}