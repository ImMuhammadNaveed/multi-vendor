import {
    setUser,
    setUserLogin,
    setUserChecked,
    setUserConversations,
    setOnlineUsers,
    setUsers,
    deleteUser,
    setUserUnreadMessages
} from '../slices/user'
import { socket } from '../../socket/Socket'
import { backend_url } from '../../server'
import axios from 'axios'
import { toast } from 'react-toastify'

export function getUserAction() {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(backend_url + "/api/user/info", { withCredentials: true })
            if (data.success) {
                dispatch(setUser(data.userData))
                dispatch(setUserLogin(true))
            }
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(setUserChecked(true))
        }
    }
}

export function getUserConversationsAction() {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(backend_url + "/api/conversation/get-user-conversations", { withCredentials: true })
            // console.log("user conversations: ", data)
            if (data.success) {
                dispatch(setUserConversations(data.conversationsData))
            }
        } catch (error) {
            console.log(error.response?.data?.message)
        }
    }
}

export function sendMessageAction(userData, data, navigate) {
    return async function (dispatch) {
        const userId = userData && userData._id
        const sellerId = data && data.shop._id
        try {
            const { data } = await axios.post(backend_url + '/api/conversation/create-new-conversation',
                { userId, sellerId },
                { withCredentials: true }
            )
            if (data.success) {
                navigate("/conversation/" + data.conversationData._id)
            }
        } catch (error) {
            toast.error(error.response?.data?.message)
        }
    }
}

export function getAllUsersAction() {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(backend_url + '/api/user/all-users', { withCredentials: true })
            if (data.success) {
                dispatch(setUsers(data.users))
            }
        } catch (error) {
            console.log(error.response)
        }
    }
}

export function deleteUserAction(id) {
    return async function (dispatch) {
        try {
            const { data } = await axios.delete(backend_url + `/api/user/delete-user/${id}`, { withCredentials: true })
            // console.log(data)
            if (data.success) {
                dispatch(deleteUser(id))
            }
            return data
        } catch (error) {
            toast.error(error.response?.data?.message)
            return { success: false, message: error.response?.data?.message }
        }
    }
}

export function addOnlineUsersAction(id) {
    return function (dispatch) {
        if (!id) return;
        socket.emit("addUser", id);
    };
}

export function getOnlineUsersAction() {
    return function (dispatch) {
        const handler = (users) => dispatch(setOnlineUsers(users))
        socket.on("getUsers", handler)
        return () => socket.off("getUsers", handler)
    }
}

export function getUserUnreadMessage(conversationId, recipientId) {
    return async function (dispatch) {
        if (!conversationId) return
        console.log(conversationId, recipientId)
        try {
            const { data } = await axios.post(backend_url + `/api/conversation/count-unread-messages/${conversationId}`, { recipient: recipientId }, { withCredentials: true })
            console.log(data)
            if (data.success) {
                dispatch(setUserUnreadMessages({conversationId:conversationId, count: data.unread}))
            }
        } catch (error) {
            console.log(error.response)
        }
    }
}