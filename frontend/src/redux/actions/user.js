import {
    setUser,
    userLogin,
    setUserOrders,
    setUserConversations,
    setOnlineUsers
} from '../slices/user'
import { socket } from '../../socket/Socket'
import { backend_url } from '../../server'
import axios from 'axios'

export function getUserAction() {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(backend_url + "/api/user/info", { withCredentials: true })
            if (data.success) {
                dispatch(setUser(data.userData))
                dispatch(userLogin(true))
            }
        } catch (error) {
            console.log(error.response?.data?.message)
        }
    }
}

export function getUserConversationsAction() {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(backend_url + "/api/conversation/get-user-conversations", { withCredentials: true })
            console.log("user conversations: ", data)
            // console.log("user conversations: ", data)
            if (data.success) {
                dispatch(setUserConversations(data.conversationsData))
            }
        } catch (error) {
            console.log(error.response?.data?.message)
        }
    }
}

export function getUserOrdersAction() {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(backend_url + "/api/order/user-orders", { withCredentials: true })
            console.log("user orders: ", data)
            if (data.success) {
                dispatch(setUserOrders(data.data))
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
            console.log(error)
        }
    }
}