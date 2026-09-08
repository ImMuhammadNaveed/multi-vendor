const { shopModel } = require("../database/shopModel")
const bcrypt = require('bcrypt')
const { emailSign, emailVerify, authSign } = require('../middlewares/auth')
const fs = require('fs')
const { sendEmail } = require("../middlewares/email")
const path = require("path")
const { default: mongoose } = require("mongoose")
const catchAsyncError = require("../middlewares/catchAsyncErrors")
const ErrorHandler = require("../utils/ErrorHandler")

const createShop = catchAsyncError(async (req, res) => {
    try {
        // console.log("this is shop create controller")
        // console.log(req.body)
        const { email } = req.body
        const newShop = await shopModel.findOne({ email: email })
        if (newShop) {
            throw new ErrorHandler("Shop already exist!", 400)
        }
        const salt = parseInt(process.env.SALT)
        const newPassword = bcrypt.hashSync(req.body.password, salt)
        const fileName = req.file.filename
        const filePath = path.join(fileName)
        const seller = {
            name: req.body.name,
            email: req.body.email,
            password: newPassword,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            avator: filePath,
            zipCode: req.body.zipCode
        }
        // console.log(seller)
        const shopActivationToken = emailSign(seller)
        const frontendURL = process.env.FRONTEND_URL
        const activationLink = `${frontendURL}/verify-shop?shopActivationToken=${shopActivationToken}`
        const senderEmail = process.env.EMAIL_SENDER
        sendEmail(req.body.email, 'Shop Activation', `Your shop creation request received, please click on the link below to verify: \n ${activationLink}`)
        res.status(200).json({ success: true, message: "email sent on account" })
    } catch (error) {
        if (req.file) {
            const fileName = req.file ? req.file.filename : ""
            const filePath = fileName ? path.join(__dirname, "..", `/uploads/${fileName}`) : ""
            fs.unlink(filePath, (unlinkError) => {
                if (unlinkError) {
                    console.log(unlinkError)
                } else {
                    console.log("unused file deleted successfully")
                }
            })
        }
        throw error
    }
})

const activateShop = catchAsyncError(async (req, res) => {
        const token = req.body.token
        const seller = emailVerify(token)
        if (!seller) {
            throw new ErrorHandler("Invalid token!", 500)
        }
        const email = seller.email
        const shop = await shopModel.findOne({ email: email })
        if (shop) {
            throw new ErrorHandler("shop already exists!", 500)
        }
        const { name, password, address, phoneNumber, avator, zipCode } = seller
        const newShopData = {
            name: name,
            email: email,
            password: password,
            address: address,
            phoneNumber: phoneNumber,
            avator: avator,
            zipCode: zipCode
        }
        const newShop = new shopModel(newShopData)
        const savedShop = await newShop.save()
        const shopToken = authSign(savedShop._id)
        res.cookie("shopToken", shopToken, {httpOnly: true, sameSite: "none", secure: true})
        res.status(200).json({ success: true, message: "Shop activated!" })
        // console.log(seller)
})

const loginShop = catchAsyncError(async (req, res) => {
        const { email, password } = req.body
        if (!email || !password) {
            throw new ErrorHandler("missing credentials", 400)
        }
        const shop = await shopModel.findOne({ email: email })
        if (!shop) {
            throw new ErrorHandler("account not found!", 400)
        }
        const isValidPassword = bcrypt.compareSync(password, shop.password)
        if (!isValidPassword) {
            throw new ErrorHandler("incorrect password!", 400)
        }
        const shopToken = authSign(shop._id)
        res.cookie("shopToken", shopToken, {httpOnly: true, sameSite: "none", secure: true})
        res.status(200).json({ success: true, message: "Shop logged in!" })
})

const info = catchAsyncError(async (req, res) => {
        const id = req.params.id
        console.log(id)
        const shop = await shopModel.findById(new mongoose.Types.ObjectId(id)).select("-password")
        console.log('this is shop info :',shop)
        if(!shop){
            throw new ErrorHandler("Shop does not exist!", 400)
        }
        res.status(200).json({ success: true, shopData: shop })
})

const getSeller = catchAsyncError(async (req, res) => {
        const shopId = req.shopId
        // console.log(shopId)
        const shop = await shopModel.findById(shopId).select("-password")
        // console.log('this is shop info :',shop)
        res.status(200).json({ success: true, shopData: shop })
})

const updateSeller = catchAsyncError(async (req, res) => {
    try {
        // console.log(req.body)
        const { name, description, address, phoneNumber, zipCode } = req.body
        const seller = await shopModel.findById(req.shopId)
        if (!seller) {
            throw new ErrorHandler("seller not found!", 400)
        }

        // update data
        seller.name = name
        seller.description = description
        seller.address = address
        seller.phoneNumber = phoneNumber
        seller.zipCode = zipCode

        if (req.file) {
            // delete old image from record
            const path = "uploads/" + seller.avator
            fs.unlink(path, (err) => {
                if (err) {
                    console.log(err.message)
                }
            })
            //save new image
            seller.avator = req.file.filename
        }

        await seller.save()
        res.status(200).json({ success: true, message: "seller info successfully updated!" })
    } catch (error) {
        if (req.file) {
            const fileName = req.file ? req.file.filename : ""
            const filePath = fileName ? path.join(__dirname, "..", `/uploads/${fileName}`) : ""
            fs.unlink(filePath, (unlinkError) => {
                if (unlinkError) {
                    console.log(unlinkError)
                } else {
                    console.log("unused file deleted successfully")
                }
            })
        }
        throw error
    }
})

const logout = catchAsyncError(async (req, res) => {
        res.clearCookie("shopToken")
        res.status(200).json({ success: true, message: "shop successfully logged out!" })
})

const getAllSellers = catchAsyncError(async (req, res) => {
        const allSellers = await shopModel.find().select("-password")
        if (!allSellers || allSellers.length === 0) {
            throw new ErrorHandler("sellers not found!", 400)
        }
        return res.status(200).json({ success: true, sellers: allSellers })
})

const deleteSeller = catchAsyncError(async (req, res) => {
        const id = req.params.id
        console.log(id)
        const objectId = new mongoose.Types.ObjectId(id)
        const deletedShop = await shopModel.findByIdAndDelete(objectId)
        if (!deletedShop) {
            throw new ErrorHandler("shop not found!", 400)
        }
        // delete old image from record
        const path = "uploads/" + deletedShop.avator
        fs.unlink(path, (err) => {
            if (err) {
                console.log(err.message)
            }
        })
        return res.status(200).json({ success: true, message: "shop successfully deleted!" })
})

const deleteWithdrawMethod = catchAsyncError(async (req, res) => {
        const seller = await shopModel.findByIdAndUpdate(req.shopId, { withdrawMethod: null })
        return res.status(200).json({ success: true, message: "withdraw method successfully deleted!" })
})

const addWithdrawMethod = catchAsyncError(async (req, res) => {
        const sellerId = req.shopId
        const { withdrawMethod } = req.body
        const seller = await shopModel.findByIdAndUpdate(sellerId, { withdrawMethod: withdrawMethod })
        return res.status(200).json({ success: true, message: 'withdraw method successfully updated!' })
})






module.exports = {
    createShop,
    activateShop,
    loginShop,
    info,
    getSeller,
    updateSeller,
    logout,
    getAllSellers,
    deleteSeller,
    deleteWithdrawMethod,
    addWithdrawMethod
}
