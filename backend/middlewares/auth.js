const jwt = require("jsonwebtoken")

const authSecret = process.env.JWT_SECRET
const emailSecret = process.env.EMAIL_SECRET

function emailSign(data) {
    const token = jwt.sign({data}, emailSecret)
    return token
}
function emailVerify(token){
    const {data} = jwt.verify(token, emailSecret)
    // console.log(data)
    return data
}
function authSign(data){
    const token = jwt.sign({data}, authSecret)
    return token
}
function authVerify(token){
    const data = jwt.verify(token, authSecret)
    return data
}

function shopLoginCheck(req, res, next) {
    try {
        // console.log("cookies: ", req.cookies)
        const sToken = req.cookies.shopToken
        // console.log(sToken)
        if(!sToken){
            return res.status(400).json({success: false, message: "shop token not found!"})
        }
        const shopData = authVerify(sToken)
        // console.log(shopData)
        req.shopId = shopData.data._id
        next()
        // console.log(shopData)
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}

function userLoginCheck(req, res, next) {
    try {
        // console.log("cookies: ", req.cookies)
        const uToken = req.cookies.uToken
        // console.log(sToken)
        if(!uToken){
            return res.status(400).json({success: false, message: "user token not found!"})
        }
        const userData = authVerify(uToken)
        // console.log("user data in auth is: ",userData)
        req.userId = userData.data
        next()
        // console.log(shopData)
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}
module.exports = {
    emailSign, 
    emailVerify,
    authSign,
    authVerify,
    shopLoginCheck,
    userLoginCheck
}