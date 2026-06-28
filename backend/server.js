const {databaseConnection} = require("./database/connection")
const express = require("express")
const app = express()
const cookieParser = require('cookie-parser')
const cors = require("cors")
const path = require('path')
const {userRouter} = require("./routes/userRoutes")
const { shopRouter } = require("./routes/shopRoutes")
const { productRouter } = require("./routes/productRoutes")
const { eventRouter } = require("./routes/eventRoutes")
const { couponRouter } = require("./routes/couponRoutes")
const { orderRouter } = require("./routes/orderRoutes")
const { conversationRouter } = require("./routes/conversationRoutes")
const { messageRouter } = require("./routes/messageRoutes")

const corsOption = {
    origin: process.env.FRONTEND_URL,
    credentials: true
}
app.use(cors(corsOption))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
// server image from server
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
// API endpoints
app.use("/api/user", userRouter)
app.use('/api/shop', shopRouter)
app.use('/api/product', productRouter)
app.use('/api/event', eventRouter)
app.use('/api/coupon', couponRouter)
app.use('/api/order', orderRouter)
app.use('/api/conversation', conversationRouter)
app.use('/api/message', messageRouter)

databaseConnection()






const backend_port = process.env.PORT
app.listen(backend_port, ()=>{console.log("Server started!")})