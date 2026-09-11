// user all messages
import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { backend_url } from "../../server"
import { getImageUrl } from "../../utils/image"
import { useDispatch, useSelector } from "react-redux"
import ConversationAnimation from '../../assets/ConversationAnimation'
import ConversationRowAnimation from '../../assets/ConversationRowAnimation'
import { getUserConversations } from '../../redux/thunks/user'

function UserInbox() {
    const conversations = useSelector(state => state.user.userConversations)
    const loading = useSelector(state => state.user.userConversationsLoading)
    const onlineUsers = useSelector(state => state.user.onlineUsers)
    const userData = useSelector(state => state.user.user)
    const userLogin = useSelector(state=> state.user.userLogin)
    const dispatch = useDispatch()
    useEffect(() => {
        if (userLogin) {
          dispatch(getUserConversations())
        }
      }, [userLogin])

    function checkOnline(item) {
        const person = item.members[1]
        const online = onlineUsers && onlineUsers.find((user) => user.userId === person)
        console.log(online)
        return online ? true : false
    }

    return (
        <>
            <div className="bg-white h-[408px] flex-1 rounded-md overflow-y-scroll">
                <div>
                    <p className="text-2xl font-semibold py-4 text-center">All Messages</p>
                    <div>
                        {
                            loading
                            ?<ConversationAnimation/>
                            :conversations && conversations.map((conversation) => (
                                <Conversation
                                    // setOpenMessage={setOpenMessage}
                                    key={conversation._id}
                                    userData={userData}
                                    conversation={conversation}
                                    online={checkOnline(conversation)}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
export default UserInbox


import { getUserUnreadMessages } from "../../redux/thunks/user"
function Conversation({ userData, conversation, online }) {
    const [shop, setShop] = useState(null)
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    async function getShop() {
        try {
            setLoading(true)
            const { data } = await axios.get(backend_url + `/api/shop/info-shop/${conversation.members[1]}`, { withCredentials: true })
            if (data.success) {
                setShop(data.shopData)
            } else {
                console.log(data.message)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => { getShop() }, [conversation.members[1]])

    useEffect(() => {
        if (!conversation?._id || !userData?._id) return
        dispatch(getUserUnreadMessages({conversationId: conversation._id, recipientId: userData._id}))
    }, [conversation?._id, userData?._id])
    if (loading) {
        return <ConversationRowAnimation />
    }

    return shop && (
        <Link
            className="flex items-center relative bg-gray-100 py-3 px-2 my-2 cursor-"
            to={`/conversation/${conversation._id}`}
        >
            <div className="w-12 h-12 shrink-0 rounded-full overflow-hidden">
                <img
                    src={getImageUrl(shop.avator)}
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

            <div className="w-full ml-2 flex justify-between">
                <div className="flex-1">
                    <p className="font-[700] text-sm">{shop.name}</p>
                    <p className="text-sm break-all">{conversation.lastMessageId === userData._id ? "You: " : shop.name.split(" ")[0] + ": "}  {conversation.lastMessage}</p>
                </div>
                {
                    conversation?.unreadCount > 0
                        ? <p className="bg-green-500 text-white text-xs rounded-full px-2 py-0.5 absolute right-4 top-6">
                            {conversation?.unreadCount}
                        </p>
                        : ""
                }

            </div>
        </Link>
    )
}
