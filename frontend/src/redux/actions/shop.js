import { backend_url } from '../../server'
import axios from 'axios'
import {
    setShop,
    setSeller,
    setAllSellers,
    sellerLogin,
    sellerChecked,
    setSellerOrder,
    setSellerConversations,
    setOnlineUsers,
    setEvents,
    deleteSeller,
    setSellerUnreadMessages,
    setLoading
} from "../slices/shop"
import { socket } from '../../socket/Socket'
import { toast } from 'react-toastify'

export function getShopAction(id) {
    return async function (dispatch) {
        try {
            dispatch(setLoading(true))
            const { data } = await axios.get(backend_url + `/api/shop/info-shop/${id}`, { withCredentials: true })
            if (data.success) {
                dispatch(setShop(data.shopData))
            }
        } catch (error) {
            console.log(error.response?.data?.message)
        } finally{
            dispatch(setLoading(false))
        }
    }
}

export function getSellerAction() {
    return async function (dispatch) {
        try {
            dispatch(setLoading(true))
            const { data } = await axios.get(backend_url + '/api/shop/get-seller', { withCredentials: true })
            if (data.success) {
                dispatch(setSeller(data.shopData))
                dispatch(sellerLogin(true))
            }
        } catch (error) {
            dispatch(sellerLogin(false))
            console.log(error.response?.data?.message)
        }finally{
            dispatch(sellerChecked(true))
            dispatch(setLoading(false))
        }
    }
}

export function getAllSellersAction() {
    return async function (dispatch) {
        try {
            dispatch(setLoading(true))
            const { data } = await axios.get(backend_url + '/api/shop/all-sellers', { withCredentials: true })
            // console.log("all sellers: ", data)
            if (data.success) {
                dispatch(setAllSellers(data.sellers))
            }
        } catch (error) {
            console.log(error.response?.data?.message)
        } finally{
            dispatch(setLoading(false))
        }
    }
}

export function getSellerConversationsAction() {
    return async function (dispatch) {
        try {
            dispatch(setLoading(true))
            const { data } = await axios.get(backend_url + "/api/conversation/get-seller-conversations", { withCredentials: true })
            if (data.success) {
                dispatch(setSellerConversations(data.conversationsData))
            }
        } catch (error) {
            console.log(error.response?.data?.message)
        } finally{
            dispatch(setLoading(false))
        }
    }
}

export function addOnlineSellersAction(id) {
    return function () {
        if (!id) return;
        socket.emit("addUser", id);
    };
}

export function getOnlineSellersAction() {
    return function(dispatch){
        const handler = (users) => dispatch(setOnlineUsers(users))
        socket.on("getUsers", handler);
        return ()=> socket.off("getUsers", handler)
    }
}

export function getEventsAction(id) {
    return async function (dispatch) {
        try {
            dispatch(setLoading(true))
            const { data } = await axios.get(backend_url + `/api/event/events-of-shop/${id}`, { withCredentials: true })
            if (data.success) {
                dispatch(setEvents(data.data))
            }
        } catch (error) {
            console.log(error.response?.data?.message)
        } finally{
            dispatch(setLoading(false))
        }
    }
}

export function deleteSellerAction(id) {
    return async function (dispatch) {
        try {
            dispatch(setLoading(true))
            const { data } = await axios.delete(backend_url + `/api/shop/delete-seller/${id}`, { withCredentials: true })
            // console.log("deleteSeller: ", data)
            if (data.success) {
                dispatch(deleteSeller(id))
            }
            return data
        } catch (error) {
            toast.error(error.response?.data?.message)
            return {
                success: false,
                message: error.response?.data?.message
            };
        } finally{
            dispatch(setLoading(false))
        }
    }
}

export function getSellerUnreadMessage(conversationId, recipientId) {
    return async function (dispatch) {
        if (!conversationId) return
        // console.log(conversationId, recipientId)
        try {
            const { data } = await axios.post(backend_url + `/api/conversation/count-unread-messages/${conversationId}`, { recipient: recipientId }, { withCredentials: true })
            // console.log("seller unread messages: ",data)
            if (data.success) {
                dispatch(setSellerUnreadMessages({conversationId:conversationId, count: data.unread}))
            }
        } catch (error) {
            console.log(error)
        }
    }
}