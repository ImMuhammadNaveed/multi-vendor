import axios from "axios"
import { backend_url } from "../server"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export function useMessages(conversationId) {
    const [messages, setMessages] = useState([])
    async function getMessages() {
        try {
            const { data } = await axios(backend_url + `/api/message/all-messages/${conversationId}`, { withCredentials: true })
            if (data.success) {
                setMessages(data.messagesData)
            }
        } catch (error) {
            toast.error(error.response?.data?.message)
        }
    }
    useEffect(() => {
        if (conversationId) { getMessages() }
    }, [conversationId])

    return {messages, setMessages}
}