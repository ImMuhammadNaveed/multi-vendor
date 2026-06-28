// user all messages
import { generalContext } from "../../context/Context"
import { useContext, useState, useEffect } from "react"
import { userContext } from '../../context/UserContext'
import axios from "axios"
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { socket } from "../../socket/Socket"

function UserInbox() {
    // const [openMessage, setOpenMessage] = useState(false)
    const { conversations, onlineUsers, userData} = useContext(userContext)
    const { backend_url } = useContext(generalContext)
    const [selectedConversation, setSelectedConversation] = useState(null)
    const location = useLocation()
    

    function checkOnline(item) {
        const person = item.members[1]
        const online = onlineUsers && onlineUsers.find((user) => user.userId === person)
        console.log(online)
        return online ? true : false
    }

    return (
        <>
            <div className="bg-white flex-1 m-4">
                <div>
                    <p className="text-2xl font-semibold my-4 text-center">All Messages</p>
                    <div>
                        {
                            conversations && conversations.map((conversation) => (
                                <Conversation
                                    // setOpenMessage={setOpenMessage}
                                    key={conversation._id}
                                    conversation={conversation}
                                    setSelectedConversation={setSelectedConversation}
                                    online={checkOnline(conversation)}
                                />
                            ))
                        }
                    </div>
                </div>

                {/* {
                    openMessage
                        ? <SellerInbox
                            setOpenMessage={setOpenMessage}
                            selectedConversation={selectedConversation}
                        />
                        : ""
                } */}

            </div>
        </>
    )
}
export default UserInbox

function Conversation({ conversation, setSelectedConversation, online }) {
    const { backend_url } = useContext(generalContext)
    const [shop, setShop] = useState(null)
    async function getShop() {
        try {
            const { data } = await axios.get(backend_url + `/api/shop/info-shop/${conversation.members[1]}`, { withCredentials: true })
            if (data.success) {
                setShop(data.shopData)
            } else {
                console.log(data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => { getShop() }, [conversation])
    return shop && (
        <Link
            className="flex items-center relative bg-gray-100 py-3 pl-2 my-2 cursor-pointer"
            to={`/conversation/${conversation._id}`}
        >
            <img
                src={`${backend_url}/uploads/` + shop.avator}
                alt=""
                className="w-12 h-12 object-cover rounded-full"
            />
            {
                online
                    ? <div
                        className="bg-green-500 h-[10px] w-[10px] rounded-full absolute left-12 bottom-11"
                    ></div>
                    : ""
            }

            <div className="ml-2">
                <p className="font-[600] text-sm">{shop.name}</p>
                <p className="text-sm">{conversation.lastMessage}</p>
            </div>
        </Link>
    )
}