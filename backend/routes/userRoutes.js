const express = require("express")
const userRouter = express.Router()
const {upload} = require("../middlewares/multer")
const {register, verifyEmail, login, info, updateUser, addAddress, deleteAddress, changePassword, anyUserInfo} = require("../controllers/userControllers")
const { userLoginCheck } = require("../middlewares/auth")

userRouter.post("/register", upload.single("image"), register)
userRouter.post("/verify-account", verifyEmail)
userRouter.post("/login", login)
userRouter.get("/info", userLoginCheck, info)
userRouter.get("/any-user-info/:id", anyUserInfo)
userRouter.post("/update", userLoginCheck, upload.single("image"), updateUser)
userRouter.post("/add-address", userLoginCheck, addAddress)
userRouter.delete("/delete-address/:id", userLoginCheck, deleteAddress)
userRouter.put("/change-password", userLoginCheck, changePassword)

module.exports = {
    userRouter
}