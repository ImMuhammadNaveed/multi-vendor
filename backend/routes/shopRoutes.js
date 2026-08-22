const express = require("express")
const shopRouter = express.Router()
const { upload } = require('../middlewares/multer')
const { shopLoginCheck, userLoginCheck, authorization } = require('../middlewares/auth')
const {
    createShop,
    activateShop,
    loginShop,
    info,
    logout,
    getSeller,
    updateSeller,
    getAllSellers,
    deleteSeller,
    deleteWithdrawMethod,
    addWithdrawMethod
} = require('../controllers/shopControllers')

shopRouter.post('/create-shop', upload.single('image'), createShop)
shopRouter.post('/verify-shop', activateShop)
shopRouter.post('/login-shop', loginShop)
shopRouter.get('/info-shop/:id', info)
shopRouter.get('/get-seller', shopLoginCheck, getSeller)
shopRouter.post('/logout', shopLoginCheck, logout)
shopRouter.post('/update-seller', shopLoginCheck, upload.single('image'), updateSeller)
shopRouter.get('/all-sellers', userLoginCheck, authorization(["Admin"]), getAllSellers)
shopRouter.delete('/delete-seller/:id', userLoginCheck, authorization(["Admin"]), deleteSeller)
shopRouter.delete('/delete-withdraw-method', shopLoginCheck, deleteWithdrawMethod)
shopRouter.post('/add-withdraw-method', shopLoginCheck, addWithdrawMethod)

module.exports = {
    shopRouter
}