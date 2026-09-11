const { userModel } = require("../database/userModel")
const bcrypt = require("bcrypt")
const { sendEmail } = require("../middlewares/email")
const { authSign, emailSign, emailVerify } = require("../middlewares/auth")
const { default: mongoose } = require("mongoose")
const catchAsyncError = require("../middlewares/catchAsyncErrors")
const ErrorHandler = require("../utils/ErrorHandler")
const { cloudinary } = require("../middlewares/cloudinary")
const { uploadToCloudinary } = require("../utils/cloudinaryUpload")

const register = catchAsyncError(async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            throw new ErrorHandler("provide all fields", 400)
        }
        console.log(name, email, password)
        const user = await userModel.findOne({ email: email })
        if (user) {
            throw new ErrorHandler("email already exists", 400)
        }
        const salt = parseInt(process.env.SALT)
        const hashedPassword = bcrypt.hashSync(password, salt)
        const avator = await uploadToCloudinary(req.file, "multi-vendor/users")
        const userData = {
            name: name,
            email: email,
            password: hashedPassword,
            role: "User",
            avator: avator
        }
        const newUser = new userModel(userData)
        await newUser.save()
        const emailToken = emailSign(newUser._id)
        const frontend_url = process.env.FRONTEND_URL
        sendEmail(userData.email, "Account verification", `Your account created please click on the link below to verify: \n ${frontend_url}/verify-account?token=${emailToken}`)
        res.status(200).json({ success: true, message: "email sent on account" })
    } catch (error) {
        throw error
    }
})

const verifyEmail = catchAsyncError(async (req, res) => {
        const { token } = req.body
        const decoded = emailVerify(token)
        const user = await userModel.findById(decoded)
        if (!user) {
            throw new ErrorHandler("Invalid user!", 400)
        }
        if (user.isVerified) {
            throw new ErrorHandler("User already verified!", 400)
        }
        user.isVerified = true
        await user.save()
        const uToken = authSign(user._id)
        res.cookie("uToken", uToken, {httpOnly: true, sameSite: "none", secure: true})
        res.status(200).json({ success: true, message: "user verified!" })
})

const login = catchAsyncError(async (req, res) => {
        const { email, password } = req.body
        if (!email || !password) {
            throw new ErrorHandler("provide all fields", 400)
        }
        const user = await userModel.findOne({ email: email })
        if (!user) {
            throw new ErrorHandler("user not found!", 400)
        }
        const isMatched = bcrypt.compareSync(password, user.password)
        if (!isMatched) {
            throw new ErrorHandler("Incorrect password!", 400)
        }
        if (!user.isVerified) {
            throw new ErrorHandler("user not verified!", 400)
        }
        const uToken = authSign(user._id)
        res.cookie("uToken", uToken, {httpOnly: true, sameSite: "none", secure: true})
        res.status(200).json({ success: true, userData: user })
})

const info = catchAsyncError(async (req, res) => {
        const userId = req.userId
        // console.log("user id in info is: ", userId)
        const user = await userModel.findById(userId).select("-password")
        // console.log('this is shop info :',shop)
        res.status(200).json({ success: true, userData: user })
})

const anyUserInfo = catchAsyncError(async (req, res) => {
        const userId = req.params.id
        console.log("user id in info is: ", userId)
        const user = await userModel.findById(userId).select("-password")
        // console.log('this is shop info :',shop)
        res.status(200).json({ success: true, userData: user })
})

const updateUser = catchAsyncError(async (req, res) => {
    try {
        // console.log(req.body)
        const { name, email, phoneNumber, password } = req.body
        const user = await userModel.findOne({ email: email })
        if (!user) {
            throw new ErrorHandler("user not found!", 400)
        }
        const isPasswordMatched = bcrypt.compareSync(password, user.password)
        if (!isPasswordMatched) {
            throw new ErrorHandler("Incorrect password!", 400)
        }

        // update data
        user.name = name
        user.email = email
        user.phoneNumber = phoneNumber

        if (req.file) {
            const avator = await uploadToCloudinary(req.file, "multi-vendor/users")
            const previousAvator = user.avator
            user.avator = avator
            await user.save()
            if (previousAvator?.public_id) {
                await cloudinary.uploader.destroy(previousAvator.public_id)
            }
        }

        res.status(200).json({ success: true, message: "user info successfully updated!" })
    } catch (error) {
        throw error
    }
})

const addAddress = catchAsyncError(async (req, res) => {
        console.log(req.body)
        const { addressType, country, city, address1, address2, zipCode } = req.body
        const user = await userModel.findById(req.userId)
        const sameTypeAddress = user.addresses.find((address) => address.addressType === addressType)
        if (sameTypeAddress) {
            throw new ErrorHandler("same typed address already exists!", 400)
        }

        user.addresses.push(req.body)

        await user.save()
        return res.status(200).json({ success: true, updatedUser: user })
})

const deleteAddress = catchAsyncError(async (req, res) => {
        const addressId = req.params.id
        const user = await userModel.findById(req.userId)

        const addressExists = user.addresses.find(
            (item) => item._id.toString() === addressId
        )
        if (!addressExists) {
            throw new ErrorHandler("Address not found!", 404)
        }

        user.addresses = user.addresses.filter((item) => item._id.toString() !== addressId)
        await user.save()
        res.status(200).json({ success: true, updatedUser: user })
})

const changePassword = catchAsyncError(async (req, res) => {
        const { oldPassword, newPassword, confirmPassword } = req.body
        // console.log(req.body)
        const user = await userModel.findById(req.userId)
        // console.log(user)
        const isMatched = bcrypt.compareSync(oldPassword, user.password)
        if (!isMatched) {
            throw new ErrorHandler("incorrect old password!", 400)
        }
        if (newPassword !== confirmPassword) {
            throw new ErrorHandler("new password and confirm password are different!", 400)
        }
        const passwordToStore = bcrypt.hashSync(newPassword, parseInt(process.env.SALT))
        user.password = passwordToStore
        await user.save()
        res.status(200).json({ success: true, message: "password successfully changed!" })
})

const logout = catchAsyncError(async (req, res) => {
        res.clearCookie("uToken")
        res.status(200).json({ success: true, message: "user successfully logged out!" })
})

const getAllUsers = catchAsyncError(async (req, res) => {
        const allUsers = await userModel.find()
        if (!allUsers || allUsers.length === 0) {
            throw new ErrorHandler("users not found!", 400)
        }
        return res.status(200).json({ success: true, users: allUsers })
})

const deleteUser = catchAsyncError(async (req, res) => {
        const id = req.params.id
        console.log(id)
        const objectId = new mongoose.Types.ObjectId(id)
        const deletedUser = await userModel.findByIdAndDelete(objectId)
        if (!deletedUser) {
            throw new ErrorHandler("user not found!", 400)
        }
        if (deletedUser.avator?.public_id) {
            await cloudinary.uploader.destroy(deletedUser.avator.public_id)
        }
        return res.status(200).json({ success: true, message: "user successfully deleted!" })
})

module.exports = {
    register,
    verifyEmail,
    login,
    info,
    anyUserInfo,
    updateUser,
    addAddress,
    deleteAddress,
    changePassword,
    logout,
    getAllUsers,
    deleteUser
}
