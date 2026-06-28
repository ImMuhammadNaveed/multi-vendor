const { userModel } = require("../database/userModel")
const bcrypt = require("bcrypt")
const { sendEmail } = require("../middlewares/email")
const { authSign, emailSign, emailVerify } = require("../middlewares/auth")
const path = require("path")
const fs = require("fs")

async function register(req, res) {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "provide all fields" })
        }
        console.log(name, email, password)
        const user = await userModel.findOne({ email: email })
        if (user) {
            return res.status(400).json({ success: false, message: "email already exists" })
        }
        const salt = parseInt(process.env.SALT)
        const hashedPassword = bcrypt.hashSync(password, salt)
        const fileName = req.file.filename
        const filePath = path.join(fileName)
        const userData = {
            name: name,
            email: email,
            password: hashedPassword,
            role: "User",
            avator: filePath
        }
        const newUser = new userModel(userData)
        await newUser.save()
        const emailToken = emailSign(newUser._id)
        const frontend_url = process.env.FRONTEND_URL
        sendEmail(userData.email, "Account verification", `Your account created please click on the link below to verify: \n ${frontend_url}/verify-account?token=${emailToken}`)
        res.status(200).json({ success: true, message: "email sent on account" })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

async function verifyEmail(req, res) {
    try {
        const { token } = req.body
        const decoded = emailVerify(token)
        const user = await userModel.findById(decoded.data)
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid user!" })
        }
        if (user.isVerified) {
            return res.status(400).json({ success: false, message: "User already verified!" })
        }
        user.isVerified = true
        await user.save()
        const uToken = authSign(user._id)
        res.cookie("uToken", uToken)
        res.status(200).json({ success: true, message: "user verified!" })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "provide all fields" })
        }
        const user = await userModel.findOne({ email: email })
        if (!user) {
            return res.status(400).json({ success: false, message: "user not found!" })
        }
        const isMatched = bcrypt.compareSync(password, user.password)
        if (!isMatched) {
            return res.status(400).json({ success: false, message: "Incorrect password!" })
        }
        if (!user.isVerified) {
            return res.status(400).json({ success: false, message: "user not verified!" })
        }
        const uToken = authSign(user._id)
        res.cookie("uToken", uToken)
        res.status(200).json({ success: true, message: "user successfully logged in!" })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

async function info(req, res) {
    try {
        const userId = req.userId
        // console.log("user id in info is: ", userId)
        const user = await userModel.findById(userId).select("-password")
        // console.log('this is shop info :',shop)
        res.status(200).json({ success: true, userData: user })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

async function anyUserInfo(req, res) {
    try {
        const userId = req.params.id
        // console.log("user id in info is: ", userId)
        const user = await userModel.findById(userId).select("-password")
        // console.log('this is shop info :',shop)
        res.status(200).json({ success: true, userData: user })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

async function updateUser(req, res) {
    try {
        // console.log(req.body)
        const { name, email, phoneNumber, password } = req.body
        const user = await userModel.findOne({ email: email })
        if (!user) {
            if (req.file) {
                const path = 'uploads/' + req.file.filename
                fs.unlink(path, (err) => {
                    if (err) {
                        console.log(err.message)
                    }
                })
            }
            return res.status(400).json({ success: false, message: "user not found!" })
        }
        const isPasswordMatched = bcrypt.compareSync(password, user.password)
        if (!isPasswordMatched) {
            if (req.file) {
                const path = 'uploads/' + req.file.filename
                fs.unlink(path, (err) => {
                    if (err) {
                        console.log(err.message)
                    }
                })
            }
            return res.status(400).json({ success: false, message: "Incorrect password!" })
        }

        // update data
        user.name = name
        user.email = email
        user.phoneNumber = phoneNumber
        
        if (req.file) {
            // delete old image from record
            const path = "uploads/" + user.avator
            fs.unlink(path, (err) => {
                if (err) {
                    console.log(err.message)
                }
            })
            //save new image
            user.avator = req.file.filename
        }

        await user.save()
        res.status(200).json({ success: true, message: "user info successfully updated!" })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

async function addAddress(req, res) {
    try {
        console.log(req.body)
        const {addressType, country, city, address1, address2, zipCode} = req.body
        const user = await userModel.findById(req.userId)
        const sameTypeAddress = user.addresses.find((address)=>address.addressType === addressType)
        if(sameTypeAddress){
            return res.status(400).json({success: false, message: "same typed address already exists!"})
        }

        user.addresses.push(req.body)
        
        await user.save()
        return res.status(200).json({success: true, userUpdatedAddress: user})
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

async function deleteAddress(req, res) {
    try {
        const addressId = req.params.id
        const user = await userModel.findById(req.userId)

        const addressExists = user.addresses.find(
            (item) => item._id.toString() === addressId
        )
        if (!addressExists) {
            return res.status(404).json({
                success: false,
                message: "Address not found!"
            })
        }
        
        user.addresses = user.addresses.filter((item)=>item._id.toString() !== addressId)
        await user.save()
        res.status(200).json({success: true, message: "Address successfully deleted!"})
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

async function changePassword(req, res) {
    try {
        const {oldPassword, newPassword, confirmPassword} = req.body
        // console.log(req.body)
        const user = await userModel.findById(req.userId)
        // console.log(user)
        const isMatched = bcrypt.compareSync(oldPassword, user.password)
        if(!isMatched){
            return res.status(400).json({ success: false, message: "incorrect old password!" })
        }
        if(newPassword !== confirmPassword){
            return res.status(400).json({ success: false, message: "new password and confirm password are different!" })
        }
        const passwordToStore = bcrypt.hashSync(newPassword, parseInt(process.env.SALT))
        user.password = passwordToStore
        await user.save()
        res.status(200).json({ success: true, message: "password successfully changed!" })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

module.exports = {
    register,
    verifyEmail,
    login,
    info,
    anyUserInfo,
    updateUser,
    addAddress,
    deleteAddress,
    changePassword
}