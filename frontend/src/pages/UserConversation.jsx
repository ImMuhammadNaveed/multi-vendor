//user one conversation
import { useContext, useEffect, useState, useRef } from "react"
import { userContext } from '../context/UserContext'
import axios from "axios"
import { shopContext } from "../context/ShopContext"
import { GoArrowRight } from "react-icons/go";
import { LuSendHorizontal } from "react-icons/lu";
import { TfiGallery } from "react-icons/tfi";
import { useParams } from "react-router-dom"
import { format } from 'timeago.js'
import { socket } from "../socket/Socket";

function UserConversation() {
    const { backend_url, setConversations, onlineUsers, userData } = useContext(userContext)
    const [newMessage, setNewMessage] = useState("")
    // const { sellerData } = useContext(shopContext)
    const [messages, setMessages] = useState([])
    const [conversation, setConversation] = useState(null)
    const { getShopInfo, shopData } = useContext(shopContext)
    const { id } = useParams()
    const [shop, setShop] = useState(null)

    const userDataRef = useRef(userData)
    const shopRef = useRef(shop)
    const conversationRef = useRef(conversation)
    useEffect(() => { userDataRef.current = userData }, [userData])
    useEffect(() => { shopRef.current = shop }, [shop])
    useEffect(() => { conversationRef.current = conversation }, [conversation])

    useEffect(() => {
        if (!userData) return
        socket.emit("addUser", userData._id)
    }, [userData])

    function checkOnline(item) {
        const person = item.members[1]
        const online = onlineUsers && onlineUsers.find((user) => user.userId === person)
        console.log(online)
        return online ? true : false
    }

    async function getShop() {
        try {
            const { data } = await axios.get(backend_url + `/api/shop/info-shop/${conversation.members[1]}`, { withCredentials: true })
            if (data.success) {
                setShop(data.shopData)
            } else {
                console.log(data.message)
            }
        } catch (error) {
            console.log(error.response)
        }
    }
    useEffect(() => { getShop() }, [conversation])

    const isFirstLoad = useRef(true)
    const ref = useRef(null)
    useEffect(() => {
        if (messages.length === 0) return
        ref.current?.scrollIntoView({
            behavior: isFirstLoad.current ? "instant" : "smooth"
        })
        isFirstLoad.current = false
    }, [messages])
    useEffect(() => {
        isFirstLoad.current = true
    }, [conversation])


    useEffect(() => {
        if (conversation) {
            getShopInfo(conversation.members[1])
        }
    }, [conversation])

    async function getConversationData() {
        try {
            const { data } = await axios.get(backend_url + `/api/conversation/get-conversation/${id}`, { withCredentials: true })
            if (data.success) {
                setConversation(data.conversationData)
            }
        } catch (error) {
            console.log(error.response.data.message)
        }
    }
    useEffect(() => { getConversationData() }, [])

    async function getMessages() {
        try {
            const { data } = await axios(backend_url + `/api/message/all-messages/${conversation._id}`, { withCredentials: true })
            if (data.success) {
                setMessages(data.messagesData)
            }
        } catch (error) {
            // alert(error.response.data.message)
            console.log(error.response.data.message)
        }
    }
    useEffect(() => {
        if (conversation) { getMessages() }
    }, [conversation])

    // user's chat feature
    async function messageSeen() {
        const currentConversation = conversationRef.current
        const currentUser = userDataRef.current
        const currentShop = shopRef.current
        if (!currentConversation || !currentUser || !currentShop) return
        try {
            const { data } = await axios.put(backend_url + "/api/message/message-seen",
                {
                    conversationId: currentConversation._id,
                    senderId: currentShop._id,
                    receiverId: currentUser._id
                },
                { withCredentials: true })
            if (data.success) {
                socket.emit("messageSeen", {
                    conversationId: currentConversation._id,
                    receiverId: currentUser._id, 
                    senderId: currentConversation.members[1] 
                })
            }
        } catch (error) {
            console.log(error.response?.data?.message)
        }
    }
    const hasSeen = useRef(false)
    useEffect(() => {
        if (!conversation || !shop || !userData) return
        if (hasSeen.current) return
        hasSeen.current = true
        messageSeen()
    }, [conversation, shop, userData])
    useEffect(() => {
        hasSeen.current = false
    }, [conversation])


    useEffect(() => {
        function handleMessageSeen({ conversationId, senderId }) {
            setMessages(prev =>
                prev.map(msg =>
                    msg.conversationId === conversationId &&
                        msg.sender === senderId
                        ? { ...msg, seen: true }
                        : msg
                )
            )
        }
        socket.on("messageSeen", handleMessageSeen)
        return () => {
            socket.off("messageSeen", handleMessageSeen)
        }
    }, [])


    useEffect(() => {
        function handleGetMessage(data) {
            const currentConversation = conversationRef.current
            const currentUser = userDataRef.current
            const currentShop = shopRef.current
            if (data.conversationId !== currentConversation?._id) return
            setMessages(prev => [...prev, data])
            setConversations(prev =>
                prev.map(conv =>
                    conv._id === data.conversationId
                        ? { ...conv, lastMessage: data.text, lastMessageId: data.sender }
                        : conv
                )
            )
            if (currentConversation && currentUser && currentShop) {
            messageSeen()
        }
        }
        socket.on("getMessage", handleGetMessage)
        return () => socket.off("getMessage", handleGetMessage)
    }, [])

    async function updateLastMessage() {
        try {
            const { data } = await axios.put(backend_url + "/api/conversation/update-last-message/" + conversation._id,
                { lastMessage: newMessage, sender: userData._id }, { withCredentials: true })
            if (data.success) {
                setConversations(prev =>
                    prev.map(conv =>
                        conv._id === conversation._id
                            ? {
                                ...conv,
                                lastMessage: newMessage,
                                lastMessageId: userData._id
                            }
                            : conv
                    )
                )
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function handleFormSubmit(e) {
        e.preventDefault()
        try {
            const { data } = await axios.post(backend_url + "/api/message/create-new-message",
                {
                    conversationId: conversation._id,
                    sender: userData._id,
                    text: newMessage
                }, { withCredentials: true })
            if (data.success) {
                updateLastMessage()
                setMessages(prev => [...prev, data.message])
                setNewMessage("")
                socket.emit("sendMessage", {
                    conversationId: conversation._id,
                    senderId: userData && userData._id,
                    receiverId: shop && shop._id,
                    text: newMessage
                })
            }
        } catch (error) {
            console.log(error)
        }
    }




    return (
        <>
            <div>
                <div>
                    <div>
                        <div className="flex items-center justify-between bg-gray-300 py-2 px-3">
                            <div className="flex items-center">
                                <img src={`${backend_url}/uploads/` + (shop?.avator || "")}
                                    alt=""
                                    className="w-12 h-12 object-cover rounded-full" />
                                <div className="ml-2">
                                    <p className="font-[600] text-sm">{shop && shop.name}</p>
                                    {
                                        conversation && checkOnline(conversation)
                                            ? <p className="text-xs">Active now</p>
                                            : ""
                                    }

                                </div>
                            </div>
                            <GoArrowRight
                                size={20}
                                onClick={() => setOpenMessage(false)}
                                className="cursor-pointer"
                            />
                        </div>
                        {
                            userData && shop && messages.length > 0 && (
                                <div className="overflow-y-scroll scrollbar-hide h-116 m-2">
                                    {messages.map((message) => (
                                        <div
                                            className={`flex items-center gap-2 my-3 ${message.sender === userData._id ? "justify-end" : "justify-start"}`}
                                            key={message._id}>
                                            <div className="flex gap-2">
                                                {
                                                    message.sender === userData._id
                                                        ? ""
                                                        : <img src={`${backend_url}/uploads/` + shop.avator}
                                                            alt=""
                                                            className="w-9 h-9 object-cover rounded-full"
                                                        />
                                                }
                                                <div>
                                                    <div className={`p-2 rounded-md inline-block ${message.sender === userData._id ? "bg-green-400" : "bg-blue-400"}`}>
                                                        <p className="text-white">{message.text}</p>
                                                        {
                                                            message.sender === userData._id
                                                                ? <p>{message.seen ? "seen" : "not seen"}</p>
                                                                : ''
                                                        }
                                                    </div>
                                                    <p className="text-xs">{format(message.createdAt)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div ref={ref}></div>
                                </div>
                            )
                        }
                    </div>
                </div>

                <form
                    className="relative flex justify-end items-center mx-4"
                    onSubmit={handleFormSubmit}
                >
                    <label htmlFor="image">
                        <TfiGallery
                            className="mr-2 cursor-pointer"
                            size={20}
                        />
                    </label>
                    <input type="file" id='image' hidden />
                    <input
                        type="text"
                        className="border border-gray-300 w-full h-8 rounded-md p-1 focus:outline-none"
                        placeholder="Enter your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="absolute"
                    >
                        <LuSendHorizontal
                            className=" mr-1 cursor-pointer"
                            size={20}
                        />
                    </button>
                </form>
            </div>
        </>
    )
}
export default UserConversation