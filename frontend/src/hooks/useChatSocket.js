import { useDispatch } from "react-redux"
import { socket } from "../socket/Socket"
import { useEffect } from "react"

export function useChatSocket(me, conversation, setMessages, updateConversation, markSeen) {
    const dispatch = useDispatch()

    useEffect(() => {
        function handleGetMessage(newMessage) {
            if (newMessage.conversationId !== conversation?._id) return
            // if (newMessage.sender === myId) return
            setMessages(prev => [...prev, newMessage])
            // updateConversation?.(newMessage)
            markSeen?.()
        }
        socket.on("getMessage", handleGetMessage)
        return () => socket.off("getMessage", handleGetMessage)
    }, [conversation, setMessages, updateConversation, markSeen])

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
        return () => {
            socket.off("messageSeen", handleMessageSeen)
        }
    }, [])
}