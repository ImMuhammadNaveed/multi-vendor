const { shopModel } = require("../database/shopModel")
const bcrypt = require('bcrypt')
const { emailSign, emailVerify, authSign } = require('../middlewares/auth')
const fs = require('fs')
const { sendEmail } = require("../middlewares/email")
const path = require("path")

async function createShop(req, res) {
    try {
        // console.log("this is shop create controller")
        // console.log(req.body)
        const { email } = req.body
        const newShop = await shopModel.findOne({ email: email })
        if (newShop) {
            if (req.file) {
                const fileName = req.file? req.file.filename : ""
                const filePath = fileName? path.join(__dirname, "..", `/uploads/${fileName}`) : ""
                fs.unlink(filePath, (error) => {
                    if (error) {
                        console.log(error)
                        return res.status(500).json({ success: false, message: error.message })
                    } else {
                        console.log("unused file deleted successfully")
                    }
                })
            }
            return res.status(400).json({ success: false, message: "user already exist!" })
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
        sendEmail(senderEmail, 'Shop Activation', `Your shop creatioon request received, please click on the link below to verify: \n ${activationLink}`)
        res.status(200).json({ success: true, message: "email sent on account" })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

async function activateShop(req, res) {
    try {
        // console.log("This is shop activation controller")
        const token = req.body.token
        // console.log(req.body)
        // console.log(token)
        const seller = emailVerify(token)
        if (!seller) {
            return res.status(500).json({ success: false, message: "Invalid token!" })
        }
        const email = seller.email
        const shop = await shopModel.findOne({ email: email })
        if (shop) {
            return res.status(500).json({ success: false, message: "shop already exists!" })
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
        const shopToken = authSign(savedShop)
        res.cookie("shopToken", shopToken)
        res.status(200).json({ success: true, message: "Shop activated!" })
        // console.log(seller)
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

async function loginShop(req, res) {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "missing credentials" })
        }
        const shop = await shopModel.findOne({ email: email })
        if (!shop) {
            return res.status(400).json({ success: false, message: "account not found!" })
        }
        const isValidPassword = bcrypt.compareSync(password, shop.password)
        if (!isValidPassword) {
            return res.status(400).json({ success: false, message: "incorrect password!" })
        }
        const shopToken = authSign(shop)
        res.cookie("shopToken", shopToken)
        res.status(200).json({ success: true, message: "Shop logged in!" })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

async function info(req, res) {
    try {
        const shopId = req.params.id
        // console.log(shopId)
        const shop = await shopModel.findById(shopId).select("-password")
        // console.log('this is shop info :',shop)
        res.status(200).json({ success: true, shopData: shop })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

async function getSeller(req, res) {
    try {
        const shopId = req.shopId
        // console.log(shopId)
        const shop = await shopModel.findById(shopId).select("-password")
        // console.log('this is shop info :',shop)
        res.status(200).json({ success: true, shopData: shop })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

async function updateSeller(req, res) {
    try {
        // console.log(req.body)
        const { name, description, address, phoneNumber, zipCode } = req.body
        const seller = await shopModel.findById(req.shopId)
        if (!seller) {
            if (req.file) {
                const path = 'uploads/' + req.file.filename
                fs.unlink(path, (err) => {
                    if (err) {
                        console.log(err.message)
                    }
                })
            }
            return res.status(400).json({ success: false, message: "seller not found!" })
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
        console.log(error.message)
        return res.status(500).json({ success: false, message: error.message })
    }
}

async function logout(req, res) {
    try {
        res.clearCookie("shopToken")
        // res.cookie({"shopToken": null},{expires: Date.now()})
        res.status(200).json({success: true, message: "shop successfully logged out!"})
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}
module.exports = {
    createShop,
    activateShop,
    loginShop,
    info,
    getSeller,
    updateSeller,
    logout
}