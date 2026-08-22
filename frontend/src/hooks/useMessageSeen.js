import { socket } from "../socket/Socket"
import { useEffect } from "react"
import { backend_url } from "../server"
import axios from "axios"
// import { setSellerUnreadMessages } from '../redux/slices/'

export function useMessageSeen(conversation, me, other) {
    async function markSeen() {
        if (!conversation?._id || !me?._id || !other?._id) return
        try {
            const { data } = await axios.put(backend_url + "/api/message/message-seen",
                {
                    conversationId: conversation._id,
                    senderId: other._id,
                    receiverId: me._id
                },
                { withCredentials: true })
            console.log(data)
            if (data.success) {
                // console.log("success")
                socket.emit("messageSeen", {
                    conversationId: conversation._id,
                    receiverId: me._id,
                    senderId: other._id
                })
                // dispatch(setSellerUnreadMessages({ conversationId: conversation._id, count: 0 }))
            }
        } catch (error) {
            console.log(error.response)
        }
    }
    useEffect(() => {
        if (!conversation || !other || !me) return
        markSeen()
    }, [conversation?._id, other?._id, me?._id])


    
    return markSeen
}