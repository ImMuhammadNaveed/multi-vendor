import { useRef, useEffect } from "react"

export function useAutoScroll(messages, conversation) {
    const isFirstLoad = useRef(true)
    const ref = useRef(null)
    useEffect(() => {
        if (messages?.length === 0) return
        ref.current?.scrollIntoView({
            behavior: isFirstLoad.current ? "instant" : "smooth"
        })
        isFirstLoad.current = false
    }, [messages])
    useEffect(() => {
        isFirstLoad.current = true
    }, [conversation])



    
    return ref
}