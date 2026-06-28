
import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'
import { socket } from "../socket/Socket";

export const shopContext = createContext()
export function ShopContextProvider({ children }) {
    const backend_url = import.meta.env.VITE_BACKEND_URL
    const [sellerData, setSellerData] = useState(null)
    const [sLoggedIn, setSLoggedIn] = useState(false)
    const [shopData, setShopData] = useState()
    const [orders, setOrders] = useState([])
    const [conversations, setConversations] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState(null)

    async function getShopInfo(id) {
        try {
            const { data } = await axios.get(backend_url + `/api/shop/info-shop/${id}`, { withCredentials: true })
            if (data.success) {
                setShopData(data.shopData)
            }
        } catch (error) {
            console.log(error.response?.data?.message)
        }
    }

    async function getSellerOrders() {
        try {
            const {data} = await axios.get(backend_url+"/api/order/seller-orders", {withCredentials: true})
            if(data.success){
                setOrders(data.data)
            }
        } catch (error) {
            console.log(error.response?.data?.message)
        }
    }
    useEffect(()=>{getSellerOrders()}, [])
    // const [shopToken, setShopToken] = useState(false)
    async function fetchSellerData() {
        try {
            const { data } = await axios.get(backend_url + '/api/shop/get-seller', { withCredentials: true })
            if (data.success) {
                setSellerData(data.shopData)
                setSLoggedIn(true)
            }
        } catch (error) {
            setSLoggedIn(false)
            console.log(error.response?.data?.message)
        }
    }
    useEffect(() => {
        fetchSellerData()
    }, [])

    const [shopEvents, setShopEvents] = useState(null)
    async function getEventsOfShop(id) {
            try {
                const { data } = await axios.get(backend_url + `/api/event/events-of-shop/${id}`, { withCredentials: true })
                console.log(data)
                if (data.success) {
                    setShopEvents(data.data)
                }
            } catch (error) {
                console.log(error.response?.data?.message)
            }
        }

        async function getSellerConversations() {
        try {
            const { data } = await axios.get(backend_url + "/api/conversation/get-seller-conversations", { withCredentials: true })
            if (data.success) {
                setConversations(data.conversationsData)
            }
        } catch (error) {
            console.log(error.response?.data?.message)
        }
    }
    useEffect(() => {
        getSellerConversations()
    }, [])

    useEffect(() => {
        if (!sellerData) return
        socket.emit("addUser", sellerData._id)
        const handleGetUsers = (data)=>setOnlineUsers(data)
        socket.on('getUsers', handleGetUsers)
        return ()=>socket.off("getUsers", handleGetUsers)
    }, [sellerData])

    const values = {
        backend_url,
        fetchSellerData, sellerData,
        orders,
        getShopInfo, shopData,
        getEventsOfShop, shopEvents,
        conversations, setConversations,
        onlineUsers,
        sLoggedIn
    }
    return <shopContext.Provider value={values}>
        {children}
    </shopContext.Provider>
} 