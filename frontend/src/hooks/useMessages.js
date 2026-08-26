import axios from "axios"
import { backend_url } from "../server"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export function useMessages(conversationId) {
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    async function getMessages() {
        try {
            setLoading(true)
            const { data } = await axios(backend_url + `/api/message/all-messages/${conversationId}`, { withCredentials: true })
            if (data.success) {
                setMessages(data.messagesData)
            }
        } catch (error) {
            toast.error(error.response?.data?.message)
        } finally{
            setLoading(false)
        }
    }
    useEffect(() => {
        if (conversationId) { getMessages() }
    }, [conversationId])

    return {messages, setMessages, loading}
}