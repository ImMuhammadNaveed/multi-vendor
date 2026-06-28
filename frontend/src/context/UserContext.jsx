import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { socket } from "../socket/Socket";

export const userContext = createContext()

export function UserContextProvider({children}) {
    const backend_url = import.meta.env.VITE_BACKEND_URL
    const [uLoggedIn, setULoggedIn] = useState(false)
    const [userData, setUserData] = useState(null)
    const [orders, setOrders] = useState([])
    const [conversations, setConversations] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState(null)

    async function getUserOrders() {
        try {
            const { data } = await axios.get(backend_url + "/api/order/user-orders", { withCredentials: true })
            if (data.success) {
                setOrders(data.data)
            }
        } catch (error) {
            console.log(error.response?.data?.message)
        }
    }
    async function getUserData() {
        try {
            const {data} = await axios.get(backend_url+"/api/user/info", {withCredentials: true})
            if(data.success){
                setUserData(data.userData)
                setULoggedIn(true)
            }
        } catch (error) {
            console.log(error.response?.data?.message)
        }
    }
    useEffect(()=>{getUserData()}, [])

    async function getUserConversations() {
        try {
            const { data } = await axios.get(backend_url + "/api/conversation/get-user-conversations", { withCredentials: true })
            console.log("user conversations: ", data)
            if (data.success) {
                setConversations(data.conversationsData)
            }
        } catch (error) {
            console.log(error.response?.data?.message)
        }
    }
    useEffect(() => {
        getUserConversations()
    }, [userData])

    useEffect(() => {
        if (!userData) return
        socket.emit("addUser", userData._id)
        const handleGetUsers = (data) => setOnlineUsers(data)
        socket.on('getUsers', handleGetUsers)
        return ()=> socket.off("getUsers", handleGetUsers)
    }, [userData])
    const values = {
        backend_url,
        userData, setUserData,
        uLoggedIn, setULoggedIn,
        getUserData,
        getUserOrders, orders,
        conversations, setConversations,
        onlineUsers
    }
    return <userContext.Provider value={values}>
        {children}
    </userContext.Provider>
}