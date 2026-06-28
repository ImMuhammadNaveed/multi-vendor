//seller side
import { useContext, useEffect, useState, useRef } from "react"
import { userContext } from '../../context/UserContext'
import axios from "axios"
import { generalContext } from "../../context/Context"
import { shopContext } from "../../context/ShopContext"
import { socket } from "../../socket/Socket"


function AllConversations() {
    const [openMessage, setOpenMessage] = useState(false)
    const { conversations, setConversations, onlineUsers, sellerData } = useContext(shopContext)
    const { backend_url } = useContext(generalContext)
    const [selectedConversation, setSelectedConversation] = useState(null)


    function checkOnline(item) {
        const person = item.members[0]
        const online = onlineUsers && onlineUsers.find((user) => user.userId === person)
        console.log(online)
        return online ? true : false
    }


    return (
        <>
            <div className="bg-white flex-1 m-4">
                {!openMessage
                    ? <div>
                        <p className="text-2xl font-semibold my-4 text-center">All Messages</p>
                        <div>
                            {
                                conversations && conversations.map((conversation) => (
                                    <Conversation
                                        setOpenMessage={setOpenMessage}
                                        key={conversation._id}
                                        conversation={conversation}
                                        setSelectedConversation={setSelectedConversation}
                                        sellerData={sellerData}
                                        online={checkOnline(conversation)}
                                    />
                                ))
                            }
                        </div>
                    </div>
                    : ""
                }
                {
                    openMessage
                        ? <SellerInbox
                            setOpenMessage={setOpenMessage}
                            selectedConversation={selectedConversation}
                            setConversations={setConversations}
                            sellerData={sellerData}
                            online={checkOnline(selectedConversation)}
                        />
                        : ""
                }

            </div>
        </>
    )
}


function Conversation({ setOpenMessage, conversation, setSelectedConversation, online }) {
    const { backend_url } = useContext(userContext)
    const [user, setUser] = useState(null)
    async function getUser() {
        try {
            const { data } = await axios.get(backend_url + `/api/user/any-user-info/${conversation.members[0]}`, { withCredentials: true })
            if (data.success) {
                setUser(data.userData)
            } else {
                console.log(data.message)
            }
        } catch (error) {
            console.log(error.response.data.message)
        }
    }
    useEffect(() => { getUser() }, [conversation])
    return user && (
        <div
            className="flex items-center relative bg-gray-100 py-3 pl-2 my-2 cursor-pointer"
            onClick={
                () => {
                    setOpenMessage(true)
                    setSelectedConversation(conversation)
                }
            }
        >
            <img
                src={`${backend_url}/uploads/` + user.avator}
                alt=""
                className="w-12 h-12 object-cover rounded-full"
            />
            {online
                ? <div
                    className="bg-green-500 h-[10px] w-[10px] rounded-full absolute left-12 bottom-11"
                ></div>
                : ""
            }

            <div className="ml-2">
                <p className="font-[600] text-sm">{user.name}</p>
                <p className="text-sm">{conversation.lastMessage}</p>
            </div>
        </div>
    )
}

import { GoArrowRight } from "react-icons/go";
import { LuSendHorizontal } from "react-icons/lu";
import { TfiGallery } from "react-icons/tfi";
import { format } from "timeago.js"
function SellerInbox({ setOpenMessage, selectedConversation, setConversations, sellerData, setOnlineUsers, online }) {
    const isFirstLoad = useRef(true)
    const ref = useRef(null)
    const { backend_url } = useContext(userContext)
    const [newMessage, setNewMessage] = useState("")
    const [messages, setMessages] = useState([])
    const [user, setUser] = useState(null)

    const sellerRef = useRef(sellerData)
    const userRef = useRef(user)
    const selectedConversationRef = useRef(selectedConversation)
    // Keep refs in sync with latest values
    useEffect(() => { sellerRef.current = sellerData }, [sellerData])
    useEffect(() => { userRef.current = user }, [user])
    useEffect(() => { selectedConversationRef.current = selectedConversation }, [selectedConversation])

    useEffect(() => {
        if (messages.length === 0) return
        ref.current?.scrollIntoView({
            behavior: isFirstLoad.current ? "instant" : "smooth"
        })
        isFirstLoad.current = false
    }, [messages])
    useEffect(() => {
        isFirstLoad.current = true
    }, [selectedConversation])

    async function getUser() {
        try {
            // console.log("selectedConversation:", selectedConversation);
            // console.log("shopData:", sellerData);
            const { data } = await axios.get(backend_url + `/api/user/any-user-info/${selectedConversation.members[0]}`, { withCredentials: true })
            // console.log("user data response: ", data)
            if (data.success) {
                setUser(data.userData)
            } else {
                console.log(data.message)
            }
        } catch (error) {
            console.log(error.response.data.message)
        }
    }
    useEffect(() => {
        if (selectedConversation) { getUser() }
    }, [selectedConversation])

    async function getMessages() {
        try {
            const { data } = await axios(backend_url + `/api/message/all-messages/${selectedConversation._id}`, { withCredentials: true })
            if (data.success) {
                setMessages(data.messagesData)
            }
        } catch (error) {
            console.log(error.response.data.message)
        }
    }
    useEffect(() => {
        if (selectedConversation) { getMessages() }
    }, [selectedConversation])

    useEffect(() => {
        function handleGetMessage(data) {
            const currentConversation = selectedConversationRef.current
            const currentUser = userRef.current
            const currentSeller = sellerRef.current
            if(data.conversationId !== currentConversation?._id) return
            setMessages(prev => [...prev, data])
            setConversations(prev=>
                prev.map(conv=>
                    conv._id === data.conversationId
                    ?{...conv, lastMessage: data.text, lastMessageId: data.sender}
                    :conv
                )
            )
            if(currentConversation&&currentUser&&currentSeller){
                messageSeen()
            }
        }
        socket.on("getMessage", handleGetMessage)
        return () => socket.off("getMessage", handleGetMessage)
    }, [])

    async function messageSeen() {
        const currentConversation = selectedConversationRef.current
        const currentUser = userRef.current
        const currentSeller = sellerRef.current
        if (!currentConversation || !currentUser || !currentSeller) return
        try {
            const { data } = await axios.put(backend_url + "/api/message/message-seen",
                {
                    conversationId: currentConversation._id,
                    senderId: currentUser._id,
                    receiverId: currentSeller._id  
                },
                { withCredentials: true })
            if (data.success) {
                socket.emit("messageSeen", {
                    conversationId: currentConversation._id,
                    receiverId: currentSeller._id,
                    senderId: currentConversation.members[0],
                })
            }
        } catch (error) {
            console.log(error.response?.data?.message)
        }
    }
    const hasSeen = useRef(false)
    useEffect(() => {
        if (!selectedConversation || !sellerData || !user) return
        if(hasSeen.current) return
        hasSeen.current = true
        messageSeen()
    }, [selectedConversation, sellerData, user])
    useEffect(()=>{
        hasSeen.current = false
    },[selectedConversation])

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
        return () => socket.off("messageSeen", handleMessageSeen)
    }, [])

    async function updateLastMessage() {
        try {
            const { data } = await axios.put(backend_url + "/api/conversation/update-last-message/" + selectedConversation._id,
                { lastMessage: newMessage, sender: sellerData._id }, { withCredentials: true })
            if (data.success) {
                setConversations(prev =>
                    prev.map(conv =>
                        conv._id === selectedConversation._id
                            ? {
                                ...conv,
                                lastMessage: newMessage,
                                lastMessageId: sellerData._id
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
                    conversationId: selectedConversation._id,
                    sender: sellerData._id,
                    text: newMessage
                }, { withCredentials: true })
            if (data.success) {
                // console.log(data.message)
                updateLastMessage()
                setMessages(prev => [...prev, data.message])
                setNewMessage("")
                socket.emit("sendMessage", {
                    conversationId: selectedConversation._id,
                    senderId: sellerData._id,
                    receiverId: user._id,
                    text: newMessage
                })
            }
        } catch (error) {
            console.log(error.response)
        }
    }




    return user && (
        <>
            <div>
                <div className="flex items-center justify-between bg-gray-300 py-2 px-3">
                    <div className="flex items-center">
                        <img src={`${backend_url}/uploads/` + user.avator}
                            alt=""
                            className="w-12 h-12 object-cover rounded-full" />
                        <div className="ml-2">
                            <p className="font-[600] text-sm">{user.name}</p>
                            {
                                online
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
                <div className="m-3 h-90 ">
                    <div className="h-full overflow-y-scroll">
                        {messages && messages.map((message) => (
                            <div
                                className={`flex items-center gap-2 my-3 ${message.sender === sellerData._id ? "justify-end" : "justify-start"}`}
                                key={message._id}>
                                <div className="flex gap-2">
                                    {
                                        message.sender === sellerData._id
                                            ? ""
                                            : <img src={`${backend_url}/uploads/` + user.avator}
                                                alt=""
                                                className="w-9 h-9 object-cover rounded-full"
                                            />
                                    }
                                    <div>
                                        <div className={`p-2 rounded-md inline-block ${message.sender === sellerData._id ? "bg-green-400" : "bg-blue-400"}`}>
                                            <p className="text-white">{message.text}</p>
                                            {
                                                message.sender === sellerData._id
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

                    <form
                        className="relative flex justify-end items-center"
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

            </div>
        </>
    )
}
export default AllConversations

