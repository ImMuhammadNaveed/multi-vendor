import { backend_url } from "../server"
import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { getShopAction } from "../redux/actions/shop"

export function useConversation(id) {
    const [conversation, setConversation] = useState(null)
    const dispatch = useDispatch()

    async function getConversationData() {
        if (!id) return
        try {
            const { data } = await axios.get(backend_url + `/api/conversation/get-conversation/${id}`, { withCredentials: true })
            if (data.success) {
                setConversation(data.conversationData)
            }
        } catch (error) {
            console.log(error.response?.data?.message)
        }
    }
    useEffect(() => { getConversationData() }, [id])
    useEffect(() => {
        if (conversation) {
            dispatch(getShopAction(conversation&&conversation.members[1]))
        }
    }, [conversation])

    



    return conversation
}