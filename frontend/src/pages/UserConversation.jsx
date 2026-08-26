//user one conversation
import { useEffect, useState } from "react"
import axios from "axios"
import { GoArrowRight } from "react-icons/go";
import { LuSendHorizontal } from "react-icons/lu";
import { TfiGallery } from "react-icons/tfi";
import { useNavigate, useParams } from "react-router-dom"
import { format } from 'timeago.js'
import { backend_url } from "../server";
import { updateUserConversation } from "../redux/slices/user";
import { useDispatch, useSelector } from "react-redux";
import { useAutoScroll } from "../hooks/useAutoScroll";
import { useConversation } from "../hooks/useConversation";
import { useChatSocket } from "../hooks/useChatSocket";
import { useMessageSeen } from "../hooks/useMessageSeen";
import { socket } from "../socket/Socket";
import { useMessages } from "../hooks/useMessages";
import { getShopAction } from "../redux/actions/shop";
import { setUserUnreadMessages } from '../redux/slices/user'
import { MdOutlineCancel } from "react-icons/md"
import { IoCheckmark, IoCheckmarkDoneOutline } from "react-icons/io5";
import UserMessagesAnimation from "../assets/UserMessagesAnimation";

function UserConversation() {
    const { id } = useParams()
    const dispatch = useDispatch()


    const [newMessage, setNewMessage] = useState("")
    const [images, setImages] = useState([])
    const [previewImages, setPreviewImages] = useState([])
    const [openImage, setOpenImage] = useState(false)
    const [image, setImage] = useState(null)

    const { userConversations } = useSelector(state => state.user)
    const conversation = useConversation(id)
    useEffect(() => {
        if (!conversation) return
        dispatch(getShopAction(conversation.members[1]))
    }, [conversation])

    const shopData = useSelector(state => state.shop.shop)
    const onlineUsers = useSelector(state => state.user.onlineUsers)
    const userData = useSelector(state => state.user.user)

    const { messages, setMessages, loading } = useMessages(conversation?._id)
    const markSeen = useMessageSeen(conversation, userData, shopData)
    useChatSocket(userData, conversation, setMessages, (m) => dispatch(updateUserConversation({ conversationId: m.conversationId, lastMessage: m.text, sender: m.sender })), markSeen)
    const ref = useAutoScroll(messages, conversation)


    function checkOnline(item) {
        if (!item) return false
        const person = item.members[1]
        const online = onlineUsers && onlineUsers.find((user) => user.userId === person)
        console.log(online)
        return online ? true : false
    }

    async function updateLastMessage() {
        try {
            const { data } = await axios.put(backend_url + "/api/conversation/update-last-message/" + conversation._id,
                { lastMessage: newMessage, sender: userData._id }, { withCredentials: true })
            if (data.success) {
                dispatch(updateUserConversation({
                    conversationId: conversation._id,
                    lastMessage: newMessage,
                    sender: userData._id
                }))
            }
        } catch (error) {
            console.log(error)
        }
    }

    function handleImages(e) {
        const files = Array.from(e.target.files)
        setImages((prev) => [...prev, ...files])
        const imagesUrls = files.map((file) => URL.createObjectURL(file))
        setPreviewImages((prev) => [...prev, ...imagesUrls])
    }

    async function handleFormSubmit(e) {
        e.preventDefault()
        const form = new FormData()
        form.append("conversationId", conversation._id)
        form.append("sender", userData._id)
        form.append("text", newMessage)
        form.append("images", images.forEach((image) => { form.append("images", image) }))
        try {
            const { data } = await axios.post(backend_url + "/api/message/create-new-message", form, { withCredentials: true })
            if (data.success) {
                updateLastMessage()
                setMessages(prev => [...prev, data.message])
                socket.emit("sendMessage", {
                    conversationId: conversation._id,
                    senderId: userData && userData._id,
                    receiverId: shopData && shopData._id,
                    text: newMessage,
                    images: data.message.images
                })
                setNewMessage("")
                setImages([])
                setPreviewImages([])
            }
        } catch (error) {
            console.log(error)
        }
    }
    const navigate = useNavigate()

    useEffect(() => {
        if (!conversation) return
        dispatch(setUserUnreadMessages({ conversationId: conversation._id, count: 0 }))
    }, [])
    return (
    <>
        <div className="h-screen flex flex-col overflow-hidden">
            {/* header - fixed */}
            <div className="flex-none flex items-center justify-between bg-gray-300 py-2 px-3">
                <div className="flex items-center">
                    <img src={`${backend_url}/uploads/` + (shopData?.avator || "")}
                        alt=""
                        className="w-12 h-12 object-cover rounded-full" />
                    <div className="ml-2">
                        <p className="font-[600] text-sm">{shopData && shopData.name}</p>
                        {conversation && checkOnline(conversation) ? <p className="text-xs">Active now</p> : ""}
                    </div>
                </div>
                <GoArrowRight
                    size={20}
                    onClick={() => navigate('/profile/inbox')}
                    className="cursor-pointer"
                />
            </div>

            {/* messages - takes all remaining height */}
            <div className="relative flex-1 min-h-0">
                <div className="absolute inset-0 overflow-y-auto scrollbar-hide px-3">
                    {
                        loading
                        ?<UserMessagesAnimation/>
                        :userData && shopData && messages.length > 0 && (
                            <div>
                                {messages.map((message) => (
                                    <div
                                        className={`flex items-center gap-2 my-3 ${message.sender === userData._id ? "justify-end" : "justify-start"}`}
                                        key={message._id}>
                                        <div className="flex gap-2">
                                            {
                                                message.sender === userData._id
                                                    ? ""
                                                    : <img src={`${backend_url}/uploads/` + shopData.avator}
                                                        alt=""
                                                        className="w-9 h-9 object-cover rounded-full"
                                                    />
                                            }
                                            <div>
                                                <div className={`p-2 rounded-md inline-block ${message.sender === userData._id ? "bg-green-200" : "bg-blue-200"}`}>
                                                    {message.images?.map((image, index) => (
                                                        <img
                                                            key={index}
                                                            src={`${backend_url}/uploads/${image}`}
                                                            alt=""
                                                            className="w-40 h-40 object-cover rounded mt-1 cursor-pointer"
                                                            onClick={() => {
                                                                setOpenImage(true)
                                                                setImage(image)
                                                            }}
                                                        />
                                                    ))}
                                                    <div className="flex justify-between items-end w-40">
                                                        <p className="break-words min-w-0">{message.text}</p>
                                                        {
                                                            message.sender === userData._id
                                                                ? <p>{message.seen ? <IoCheckmarkDoneOutline size={20} color="blue" /> : <IoCheckmark size={20} color="gray" />}</p>
                                                                : ''
                                                        }
                                                    </div>
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

                {/* image preview overlays messages */}
                {previewImages.length > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 bg-white/20 px-2 py-2">
                        <div className="flex overflow-x-auto scrollbar-hide">
                            {previewImages.map((item, index) =>
                                <div key={index} className="relative flex-none w-20 h-20 mr-2">
                                    <MdOutlineCancel
                                        className="absolute -top-1 -right-1 cursor-pointer z-10 bg-white rounded-full"
                                        onClick={() => {
                                            setPreviewImages(previewImages.filter((i) => i !== item))
                                            setImages(images.filter((_, i) => i !== index))
                                        }}
                                    />
                                    <img
                                        src={item}
                                        alt=""
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* send message - fixed */}
            <form
                className="flex-none flex items-center px-3 pb-2 "
                onSubmit={handleFormSubmit}
            >
                <label htmlFor="image">
                    <TfiGallery className="mr-2 cursor-pointer flex-none" size={20} />
                </label>
                <input type="file" id='image' hidden onChange={handleImages} />
                <input
                    type="text"
                    required
                    className="border border-gray-300 flex-1 h-8 rounded-md p-1 pr-8 focus:outline-none"
                    placeholder="Enter your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button type="submit" className="ml-[-28px] flex-none">
                    <LuSendHorizontal className="cursor-pointer" size={20} />
                </button>
            </form>
        </div>
        {openImage && <PreviewImage image={image} setOpenImage={setOpenImage} />}
    </>
)
}
export default UserConversation







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
                        src={`${backend_url}/uploads/${image}`}
                        alt=""
                        className="w-120 h-120 object-contain"
                    />
                </div>
            </div>
        </div>
    )
}