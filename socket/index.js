//socket
const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
const socketIO = require("socket.io")
require("dotenv").config()
const io = socketIO(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true,
    }
})
const cors = require("cors")

// app.use(cors())
app.use(express.json())

let users = []
function addUser(userId, socketId) {
    const index = users.findIndex((user) => user.userId === userId)
    if (index !== -1) {
        users[index].socketId = socketId
    } else {
        users.push({ userId, socketId })
    }
}
function removeUser(id) {
    users = users.filter((user) => user.socketId !== id)
}
function getUser(userId) {
    return users.find((user) => user.userId === userId)
}

app.get("/", (req, res) => { res.send("Hello world from socket!") })
io.on("connection", (socket) => {
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id)
        io.emit("getUsers", users)
    })
    socket.on("sendMessage", ({ conversationId, senderId, receiverId, text, images }) => {
        console.log(images)
        const receiver = getUser(receiverId)
        if (receiver) {
            io.to(receiver.socketId).emit("getMessage", {
                conversationId,
                sender: senderId,
                text,
                images,
                seen: false
            })
            
        }
    })
    socket.on("messageSeen", ({ conversationId, senderId, receiverId }) => {
        console.log("server got messageSeen", { senderId, receiverId })
        console.log("online users at this moment:", users)
        const sender = getUser(senderId)
        console.log("found sender socket:", sender)
        if (sender) {
            io.to(sender.socketId).emit("messageSeen", {
                conversationId,
                senderId,
                receiverId
            })
        }
    })
    socket.on("disconnect", () => {
        removeUser(socket.id)
        io.emit("getUsers", users)
    })
    socket.on("logout", () => {
        removeUser(socket.id); // or removeUser(socket.id)
        io.emit("getUsers", users);
    });
})






server.listen(process.env.PORT || 4000, () => { console.log(`socket server started at ${process.env.PORT}`) })