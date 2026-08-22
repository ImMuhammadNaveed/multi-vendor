const express = require("express")
const userRouter = express.Router()
const { upload } = require("../middlewares/multer")
const {
    register,
    verifyEmail,
    login,
    info,
    updateUser,
    addAddress,
    deleteAddress,
    changePassword,
    anyUserInfo,
    logout,
    getAllUsers,
    deleteUser
} = require("../controllers/userControllers")
const { userLoginCheck, authorization } = require("../middlewares/auth")

userRouter.post("/register", upload.single("image"), register)
userRouter.post("/verify-account", verifyEmail)
userRouter.post("/login", login)
userRouter.get("/info", userLoginCheck, info)
userRouter.get("/any-user-info/:id", anyUserInfo)
userRouter.post("/update", userLoginCheck, upload.single("image"), updateUser)
userRouter.post("/add-address", userLoginCheck, addAddress)
userRouter.delete("/delete-address/:id", userLoginCheck, deleteAddress)
userRouter.put("/change-password", userLoginCheck, changePassword)
userRouter.post("/logout", userLoginCheck, logout)
userRouter.get("/all-users", userLoginCheck, authorization(["Admin"]), getAllUsers)
userRouter.delete('/delete-user/:id', userLoginCheck, authorization(["Admin"]), deleteUser)

module.exports = {
    userRouter
}