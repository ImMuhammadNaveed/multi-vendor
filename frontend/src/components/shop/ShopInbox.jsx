//seller side
import { useEffect, useState } from "react"
import axios from "axios"
import { socket } from "../../socket/Socket"
import { backend_url } from "../../server"
import { getImageUrl } from "../../utils/image"
import { getSellerUnreadMessages } from '../../redux/thunks/shop'
import { useDispatch, useSelector } from "react-redux"
import ConversationAnimation from '../../assets/ConversationAnimation'
import ConversationRowAnimation from '../../assets/ConversationRowAnimation'


function AllConversations() {
    const [openMessage, setOpenMessage] = useState(false)
    const conversations = useSelector(state => state.shop.sellerConversations)
    const onlineUsers = useSelector(state => state.shop.onlineUsers)
    const sellerData = useSelector(state => state.shop.seller)
    const loading = useSelector(state => state.shop.sellerConversationsLoading)
    const [selectedConversation, setSelectedConversation] = useState(null)
    const [selectedUser, setSelectedUser] = useState(null)


    function checkOnline(item) {
        if (!item) return false
        const person = item.members[0]
        const online = onlineUsers && onlineUsers.find((user) => user.userId === person)
        // console.log(online)
        return online ? true : false
    }


    return (
        <>
            <div className="bg-white flex-1 h-full">
                {!openMessage
                    ? <div>
                        <p className="text-2xl font-semibold text-center py-4">All Messages</p>
                        <div>
                            {
                                loading
                                    ? <ConversationAnimation />
                                    : conversations && conversations.map((conversation) => (
                                        <Conversation
                                            setOpenMessage={setOpenMessage}
                                            key={conversation._id}
                                            conversation={conversation}
                                            setSelectedConversation={setSelectedConversation}
                                            setSelectedUser={setSelectedUser}
                                            online={checkOnline(conversation)}
                                            sellerData={sellerData}
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
                            sellerData={sellerData}
                            selectedUser={selectedUser}
                            online={checkOnline(selectedConversation)}
                        />
                        : ""
                }

            </div>
        </>
    )
}


function Conversation({ setOpenMessage, conversation, setSelectedConversation, setSelectedUser, online, sellerData }) {
    const dispatch = useDispatch()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    async function getUser() {
        if (!conversation) return
        try {
            setLoading(true)
            const { data } = await axios.get(backend_url + `/api/user/any-user-info/${conversation?.members[0]}`, { withCredentials: true })
            if (data.success) {
                setUser(data.userData)
            } else {
                console.log(data.message)
            }
        } catch (error) {
            console.log(error.response.data)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (!conversation) return
        getUser()
    }, [conversation])


    useEffect(() => {
        if (!conversation?._id || !sellerData?._id) return
        dispatch(getSellerUnreadMessages({conversationId:conversation._id, recipientId:sellerData._id}))
    }, [conversation?._id, sellerData?._id])
    if (loading) {
        return <ConversationRowAnimation />
    }

    return user && (
        <div
            className="flex items-center relative bg-gray-100 py-3 pl-2 my-2 cursor-pointer"
            onClick={
                () => {
                    setOpenMessage(true)
                    setSelectedConversation(conversation)
                    setSelectedUser(user)
                }
            }
        >
            <div className="w-12 h-12 shrink-0 rounded-full overflow-hidden">
                <img
                    src={getImageUrl(user.avator)}
                    alt=""
                    className="w-full h-full object-cover"
                />
            </div>
            {online
                ? <div
                    className="border-[2px] border-white bg-green-500 h-[14px] w-[14px] rounded-full absolute left-12 bottom-11"
                ></div>
                : <div
                    className="border-[2px] border-white bg-gray-500 h-[14px] w-[14px] rounded-full absolute left-12 bottom-11"
                ></div>
            }

            <div className="ml-2">
                <p className="font-[700] text-sm">{user.name}</p>
                <p className="text-sm">{conversation.lastMessageId === sellerData._id ? "You: " : user.name.split(" ")[0] + ": "}{conversation?.lastMessage}</p>
                {
                    conversation?.unreadCount > 0
                        ? <p className="bg-green-500 text-white text-xs rounded-full px-2 py-0.5 absolute right-4 top-6">
                            {conversation?.unreadCount}
                        </p>
                        : ""
                }
            </div>
        </div>
    )
}

import { GoArrowRight } from "react-icons/go";
import { LuSendHorizontal } from "react-icons/lu";
import { TfiGallery } from "react-icons/tfi";
import { format } from "timeago.js"
import { updateSellerConversation, setSellerUnreadMessages } from "../../redux/slices/shop"
import { useAutoScroll } from "../../hooks/useAutoScroll"
import { useMessages } from "../../hooks/useMessages"
import { useMessageSeen } from "../../hooks/useMessageSeen"
import { useChatSocket } from "../../hooks/useChatSocket"
import { MdOutlineCancel } from "react-icons/md"
import { IoCheckmark, IoCheckmarkDoneOutline } from "react-icons/io5";
import SellerMessagesAnimation from '../../assets/SellerMessagesAnimation'
import ButtonSpinner from '../loading/ButtonSpinner'
function SellerInbox({ setOpenMessage, selectedConversation, selectedUser, sellerData, online }) {
    const [images, setImages] = useState([])
    const [previewImages, setPreviewImages] = useState([])
    const [openImage, setOpenImage] = useState(false)
    const [image, setImage] = useState(null)
    const dispatch = useDispatch()
    const [newMessage, setNewMessage] = useState("")
    const [sendingMessage, setSendingMessage] = useState(false)
    const { messages, setMessages, loading } = useMessages(selectedConversation?._id)
    const markSeen = useMessageSeen(selectedConversation, sellerData, selectedUser)
    useChatSocket(
        selectedUser, 
        selectedConversation, 
        setMessages, 
        (m) => dispatch(updateSellerConversation({ conversationId: m.conversationId, lastMessage: m.text, sender: m.sender })), 
        markSeen
    )
    const ref = useAutoScroll(messages, selectedConversation)

    function handleImages(e) {
        const files = Array.from(e.target.files)
        setImages((prev) => [...prev, ...files])
        const imagesUrls = files.map((file) => URL.createObjectURL(file))
        setPreviewImages((prev) => [...prev, ...imagesUrls])
    }

    async function updateLastMessage() {
        try {
            const { data } = await axios.put(backend_url + "/api/conversation/update-last-message/" + selectedConversation._id,
                { lastMessage: newMessage, sender: sellerData._id }, { withCredentials: true })
            if (data.success) {
                dispatch(updateSellerConversation({ conversationId: selectedConversation._id, lastMessage: newMessage, sender: sellerData._id }))
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function handleFormSubmit(e) {
        e.preventDefault()
        const form = new FormData()
        form.append("conversationId", selectedConversation._id)
        form.append("sender", sellerData._id)
        form.append("text", newMessage)
        images.forEach((image) => form.append("images", image))
        try {
            setSendingMessage(true)
            const { data } = await axios.post(backend_url + "/api/message/create-new-message", form, { withCredentials: true })
            if (data.success) {
                updateLastMessage()
                setMessages(prev => [...prev, data.message])
                socket.emit("sendMessage", {
                    conversationId: selectedConversation._id,
                    senderId: sellerData._id,
                    receiverId: selectedUser._id,
                    text: newMessage,
                    images: data.message.images
                })
                setNewMessage("")
                setImages([])
                setPreviewImages([])
            }
        } catch (error) {
            console.log(error.response)
        } finally {
            setSendingMessage(false)
        }
    }

    useEffect(() => {
        if (!selectedConversation) return
        dispatch(setSellerUnreadMessages({ conversationId: selectedConversation._id, count: 0 }))
    }, [selectedConversation])


    return selectedUser && (
        <>
            <div className="h-full flex flex-col overflow-hidden">
                {/* header*/}
                <div className="flex-none flex items-center justify-between bg-gray-300 py-2 px-3">
                    <div className="flex items-center">
                        <img src={getImageUrl(selectedUser.avator)}
                            alt=""
                            className="w-12 h-12 object-cover rounded-full" />
                        <div className="ml-2">
                            <p className="font-[600] text-sm">{selectedUser.name}</p>
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
                {/* messages area */}
                <div className="relative flex-1 min-h-0">
                    <div className="absolute inset-0 overflow-y-auto scrollbar-hide px-3">
                        {
                            loading
                                ? <SellerMessagesAnimation />
                                : messages?.map((message) => (
                                    <div
                                        className={`flex items-center gap-2 my-3 ${message.sender === sellerData._id ? "justify-end" : "justify-start"}`}
                                        key={message._id}>
                                        <div className="flex gap-2">
                                            {
                                                message.sender === sellerData._id
                                                    ? ""
                                                    : <img src={getImageUrl(selectedUser.avator)}
                                                        alt=""
                                                        className="w-9 h-9 object-cover rounded-full"
                                                    />
                                            }
                                            <div>
                                                <div className={`p-2 rounded-md inline-block ${message.sender === sellerData._id ? "bg-green-200" : "bg-blue-200"}`}>
                                                    {message.images?.map((image, index) => (
                                                        <img
                                                            key={index}
                                                            onClick={() => {
                                                                setOpenImage(true)
                                                                setImage(image)
                                                            }}
                                                            src={getImageUrl(image)}
                                                            alt=""
                                                            className="w-40 h-40 object-cover rounded mt-1 cursor-pointer"
                                                        />
                                                    ))}
                                                    <div className="w-40 flex items-end justify-between">
                                                        <p className="break-words min-w-0">{message.text}</p>
                                                        {
                                                            message.sender === sellerData._id
                                                                ? <p>{message.seen ? <IoCheckmarkDoneOutline size={20} color="blue" /> : <IoCheckmark size={20} color="gray" />}</p>
                                                                : ''
                                                        }
                                                    </div>

                                                </div>
                                                <p className="text-xs">{format(message.createdAt)}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                        }
                        <div ref={ref}></div>
                    </div>
                    {/* send images preview */}
                    {
                        previewImages.length > 0 && (
                            <div className="absolute bottom-0 left-0 right-0 bg-white/95 border-t border-gray-200 px-2 py-2">
                                <div className="flex overflow-x-auto scrollbar-hide">
                                    {
                                        previewImages.map((item, index) =>
                                            <div key={index} className="relative flex-none w-20 h-20 mr-2">
                                                <MdOutlineCancel
                                                    className="absolute -top-1 -right-1 cursor-pointer z-10 bg-white rounded-full"
                                                    onClick={() => {
                                                        setPreviewImages(previewImages.filter((_, i) => i !== index))
                                                        setImages(images.filter((_, i) => i !== index))
                                                    }}
                                                />
                                                <img
                                                    src={item}
                                                    alt=""
                                                    className="w-20 h-20 object-cover rounded"
                                                />
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
                {/* send message */}
                <form
                    className="relative flex justify-end items-center mx-2 mb-2"
                    onSubmit={handleFormSubmit}
                >
                    <input type="file" id="image" hidden onChange={handleImages} />
                    <label htmlFor="image">
                        <TfiGallery
                            className="mr-2 cursor-pointer"
                            size={20}
                        />
                    </label>
                    <input
                        type="text"
                        required
                        className="border border-gray-300 w-full h-8 rounded-md p-1 focus:outline-none"
                        placeholder="Enter your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="absolute disabled:opacity-60"
                        disabled={sendingMessage}
                    >
                        {sendingMessage && <ButtonSpinner size={16} />}
                        <LuSendHorizontal
                            className=" mr-1 cursor-pointer"
                            size={20}
                        />
                    </button>

                </form>
            </div>
            {openImage && <PreviewImage image={image} setOpenImage={setOpenImage} />}
        </>
    )
}
export default AllConversations


function PreviewImage({ image, setOpenImage }) {
    return (
        <div>
            <div className="inset-0 fixed bg-black/30 z-60 flex items-center justify-center">
                <div className="bg-white rounded-md">
                    <MdOutlineCancel
                        size={25}
                        className="absolute cursor-pointer z-10 bg-white rounded-full"
                        onClick={() => setOpenImage(false)}
                    />
                    <img
                        src={getImageUrl(image)}
                        alt=""
                        className="w-120 h-120 object-contain"
                    />
                </div>
            </div>
        </div>
    )
}
