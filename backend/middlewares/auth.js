const jwt = require("jsonwebtoken")

const { userModel } = require('../database/userModel')
const authSecret = process.env.JWT_SECRET
const emailSecret = process.env.EMAIL_SECRET

function emailSign(data) {
    const token = jwt.sign({ data }, emailSecret)
    return token
}
function emailVerify(token) {
    const { data } = jwt.verify(token, emailSecret)
    return data
}
function authSign(data) {
    const token = jwt.sign({ data }, authSecret)
    return token
}
function authVerify(token) {
    const data = jwt.verify(token, authSecret)
    return data
}

function shopLoginCheck(req, res, next) {
    try {
        const sToken = req.cookies.shopToken
        if (!sToken) {
            return res.status(400).json({ success: false, message: "shop token not found!" })
        }
        const shopData = authVerify(sToken)
        req.shopId = shopData.data
        next()
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

function userLoginCheck(req, res, next) {
    try {
        const uToken = req.cookies.uToken
        if (!uToken) {
            return res.status(400).json({ success: false, message: "user token not found!" })
        }
        const userData = authVerify(uToken)
        req.userId = userData.data
        next()
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

function authorization(roles) {
    return async function (req, res, next) {
        try {
            const user = await userModel.findById(req.userId)
            if (!user) {
                return res.status(404).json({ success: false, message: "user not found!" })
            }
            if (!roles.includes(user.role)) {
                return res.status(403).json({ success: false, message: "user is not authorized!" })
            }
            next()
        } catch (error) {
            return res.status(500).json({success: false, message: error.message})
        }

    }
}







module.exports = {
    emailSign,
    emailVerify,
    authSign,
    authVerify,
    shopLoginCheck,
    userLoginCheck,
    authorization
}