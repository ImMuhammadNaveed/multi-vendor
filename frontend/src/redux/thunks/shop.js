import { backend_url } from '../../server'
import axios from 'axios'
import { setOnlineUsers } from "../slices/shop"
import { socket } from '../../socket/Socket'
import { toast } from 'react-toastify'
import { createAsyncThunk } from '@reduxjs/toolkit'


export const getShop = createAsyncThunk(
    "shop/getShop",
    async (id, { rejectWithValue }) => {
        try {
            console.log(id)
            const { data } = await axios.get(backend_url + `/api/shop/info-shop/${id}`, { withCredentials: true })
            if (!data.success) {
                return rejectWithValue(data.message || "Failed to get shop details")
            }
            console.log("shop data: ", data )
            return data.shopData
        } catch (error) {
            console.log(error.response?.data?.message)
            return rejectWithValue(error.response?.data?.message || "Failed to get shop details")
        }
    }
)

export const getSeller = createAsyncThunk(
    'shop/getSeller',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(backend_url + '/api/shop/get-seller', { withCredentials: true })
            if (!data.success) {
                return rejectWithValue(data.message || "Failed to get seller details")
            }
            return data.shopData
        } catch (error) {
            console.log(error.response?.data?.message)
            return rejectWithValue(error.response?.data?.message || "Failed to get seller details")
        }
    }
)

export const getAllSellers = createAsyncThunk(
    "shop/getAllSellers",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(backend_url + '/api/shop/all-sellers', { withCredentials: true })
            if (!data.success) {
                return rejectWithValue(data.message || "Failed to get all sellers")
            }
            return data.sellers
        } catch (error) {
            console.log(error.response?.data?.message)
            return rejectWithValue(error.response?.data?.message || "Failed to get all sellers")
        }
    }
)

export const getSellerConversations = createAsyncThunk(
    "shop/getSellerConversations",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(backend_url + "/api/conversation/get-seller-conversations", { withCredentials: true })
            if (!data.success) {
                return rejectWithValue(data.message || "Failed to get seller conversation")
            }
            console.log("seller conversations: ",data)
            return data.conversationsData
        } catch (error) {
            console.log(error.response?.data?.message)
            return rejectWithValue(error.response?.data?.message || "Failed to get seller conversations")
        }
    }
)

export function addOnlineSellers(id) {
    return function () {
        if (!id) return;
        socket.emit("addUser", id);
    };
}

export function getOnlineSellers() {
    return function (dispatch) {
        const handler = (users) => dispatch(setOnlineUsers(users))
        socket.on("getUsers", handler);
        return () => socket.off("getUsers", handler)
    }
}

export const deleteSeller = createAsyncThunk(
    "shop/deleteSeller",
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await axios.delete(backend_url + `/api/shop/delete-seller/${id}`, { withCredentials: true })
            if (!data.success) {
                return rejectWithValue(data.message || "Failed to delete seller")
            }
            return { id: id, data: data }
        } catch (error) {
            toast.error(error.response?.data?.message)
            return {
                success: false,
                message: error.response?.data?.message
            };
        }
    }
)

export const getSellerUnreadMessages = createAsyncThunk(
    "shop/getSellerUnreadMessages",
    async ({ conversationId, recipientId }, { rejectWithValue }) => {
        if (!conversationId) return
        try {
            const { data } = await axios.post(backend_url + `/api/conversation/count-unread-messages/${conversationId}`, { recipient: recipientId }, { withCredentials: true })
            if (!data.success) {
                return rejectWithValue(data.message || "Failed to get seller unread messages")
            }
            return {conversationId: conversationId, count: data.unread}
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response?.data?.message || "Failed to get seller unread messages")
        }
    }
)

export const logoutSeller = createAsyncThunk(
    "shop/logout",
    async (_, { rejectWithValue, getState }) => {
        try {
            const seller = getState().shop.seller
            const { data } = await axios.post(backend_url + '/api/shop/logout', {}, { withCredentials: true })
            if (!data.success) {
                toast.error(data.message || "Failed to logout seller")
                return rejectWithValue(data.message || "Failed to logout Seller")
            }
            socket.emit("logout", seller?._id)
            toast.success(data.message)
            window.location.href = '/'
            return data
        } catch (error) {
            toast.error(error.response?.data?.message)
            return rejectWithValue(error.response?.data?.message || "Failed to logout seller")
        }
    }
)