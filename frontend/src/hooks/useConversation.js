import { backend_url } from "../server"
import axios from "axios"
import { useEffect, useState } from "react"

export function useConversation(id) {
    const [conversation, setConversation] = useState(null)
    const [loading, setLoading] = useState(Boolean(id))

    async function getConversationData() {
        if (!id) return
        try {
            setLoading(true)
            const { data } = await axios.get(backend_url + `/api/conversation/get-conversation/${id}`, { withCredentials: true })
            if (data.success) {
                setConversation(data.conversationData)
            }
        } catch (error) {
            console.log(error.response?.data?.message)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => { getConversationData() }, [id])
    return { conversation, loading }
}
