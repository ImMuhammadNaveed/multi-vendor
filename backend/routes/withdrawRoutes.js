const express = require("express")
const withdrawRouter = express.Router()
const { 
    createWithdraw,
    updateWithdrawRequest, 
    getAllWithdrawRequests 
} = require("../controllers/withdrawController")
const { 
    shopLoginCheck, 
    userLoginCheck, 
    authorization 
} = require("../middlewares/auth")


withdrawRouter.post("/create-withdraw", shopLoginCheck, createWithdraw)
withdrawRouter.put("/update-withdraw-request/:id", userLoginCheck, authorization(["Admin"]), updateWithdrawRequest)
withdrawRouter.get("/get-all-withdraw-requests", userLoginCheck, authorization(["Admin"]), getAllWithdrawRequests)



module.exports = {
    withdrawRouter
}