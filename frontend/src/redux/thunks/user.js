import { setOnlineUsers } from '../slices/user'
import { socket } from '../../socket/Socket'
import { backend_url } from '../../server'
import axios from 'axios'
import { toast } from 'react-toastify'
import { createAsyncThunk } from '@reduxjs/toolkit'


export const getUser = createAsyncThunk(
    "user/getUser",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(backend_url + "/api/user/info", { withCredentials: true })
            if (!data.success) {
                return rejectWithValue(data.message || "Failed to get user data.")
            }
            return data.userData
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response?.data?.message || "Failed to get user data.")
        }
    }
)

export const getUserConversations = createAsyncThunk(
    "user/getUserConversations",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(backend_url + "/api/conversation/get-user-conversations", { withCredentials: true })
            if (!data.success) {
                return rejectWithValue(data.message || "Failed to get user conversations")
            }
            console.log(data)
            return data.conversationsData

        } catch (error) {
            console.log(error.response?.data?.message)
            return rejectWithValue(error.response?.data?.message || "Failed to get user conversations")
        }
    }
)

export const sendMessage = createAsyncThunk(
    "user/sendMessage",
    async ({ userData, data, navigate }, { rejectWithValue }) => {
        const userId = userData && userData._id
        const sellerId = data && data.shop._id
        try {
            console.log("send message triggered")
            const { data } = await axios.post(backend_url + '/api/conversation/create-new-conversation',
                { userId, sellerId },
                { withCredentials: true }
            )
            if (data.success) {
                navigate("/conversation/" + data.conversationData._id)
            } else {
                console.log(data.message)
                return rejectWithValue(data.message || "Failed to create conversation")
            }
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response?.data?.message || "Failed to create conversation")
        }
    }
)

export const getAllUsers = createAsyncThunk(
    "user/getAllUsers",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(backend_url + '/api/user/all-users', { withCredentials: true })
            if (!data.success) {
                return rejectWithValue(data.message || "Failed to get all user")
            }
            return data.users
        } catch (error) {
            console.log(error.response)
            return rejectWithValue(error.response?.data?.message || "Failed to get all user")
        }
    }
)

export const deleteUser = createAsyncThunk(
    "user/deleteUser",
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await axios.delete(backend_url + `/api/user/delete-user/${id}`, { withCredentials: true })
            if (!data.success) {
                return rejectWithValue(data.message || "Failed to delete user")
            }
            return { id: id, data: data }
        } catch (error) {
            toast.error(error.response?.data?.message)
            return rejectWithValue(error.response?.data?.message || "Failed to delete user")
        }
    }
)

export function addOnlineUsers(id) {
    return function () {
        if (!id) return;
        socket.emit("addUser", id);
    };
}

export function getOnlineUsers() {
    return function (dispatch) {
        const handler = (users) => dispatch(setOnlineUsers(users))
        socket.on("getUsers", handler)
        return () => socket.off("getUsers", handler)
    }
}

export const getUserUnreadMessages = createAsyncThunk(
    "user/getUserUnreadMessages",
    async ({ conversationId, recipientId }, { rejectWithValue }) => {
        if (!conversationId) return rejectWithValue("No conversationId provided")
        try {
            console.log("conversation id in getUserUnreadMessages: ", conversationId)
            const { data } = await axios.post(backend_url + `/api/conversation/count-unread-messages/${conversationId}`, { recipient: recipientId }, { withCredentials: true })
            if (!data.success) {
                return rejectWithValue(data.message || "Failed to get user unread messages")
            }
            
            return { conversationId: conversationId, count: data.unread }
        } catch (error) {
            console.log(error.response)
            return rejectWithValue(error.response?.data?.message || "Failed to get user unread messages")
        }
    }
)

export const addUserAddress = createAsyncThunk(
    "user/addUserAddress",
    async (addressData, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(backend_url + "/api/user/add-address", addressData, { withCredentials: true })
            if (!data.success) {
                toast.error(data.message)
                return rejectWithValue(data.message || "Failed to add user address")
            }
            return data.updatedUser
        } catch (error) {
            toast.error(error.response?.data?.message)
            return rejectWithValue(error.response?.data?.message || "Failed to add user address")
        }
    }
)

export const deleteUserAddress = createAsyncThunk(
    "user/deleteUserAddress",
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await axios.delete(backend_url + `/api/user/delete-address/${id}`, { withCredentials: true })
            if (!data.success) {
                toast.error(data.message)
                return rejectWithValue(data.message || "Failed to delete user address")
            }
            return data.updatedUser
        } catch (error) {
            toast.error(error.response?.data?.message)
            return rejectWithValue(error.response?.data?.message || "Failed to delete user address")
        }
    }
)

export const logoutUser = createAsyncThunk(
    "user/logout",
    async (_, { rejectWithValue, getState }) => {
        try {
            const user = getState().user.user
            const { data } = await axios.post(backend_url + '/api/user/logout', {}, { withCredentials: true })
            if (!data.success) {
                toast.error(data.message || "Failed to logout user")
                return rejectWithValue(data.message || "Failed to logout user")
            }
            socket.emit("logout", user?._id)
            toast.success(data.message)
            window.location.href = '/'
            return data
        } catch (error) {
            toast.error(error.response?.data?.message)
            return rejectWithValue(error.response?.data?.message || "Failed to logout user")
        }
    }
)