import { backend_url } from '../../server'
import axios from 'axios'
import { setShop, setSeller, sellerLogin, setSellerOrder, setSellerConversations, setOnlineUsers, setEvents } from "../slices/shop"
import { socket } from '../../socket/Socket'

export function getShopAction(id) {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(backend_url + `/api/shop/info-shop/${id}`, { withCredentials: true })
            if (data.success) {
                dispatch(setShop(data.shopData))
            }
        } catch (error) {
            console.log(error.response?.data?.message)
        }
    }
}

export function getSellerAction() {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(backend_url + '/api/shop/get-seller', { withCredentials: true })
            if (data.success) {
                dispatch(setSeller(data.shopData))
                dispatch(sellerLogin(true))
            }
        } catch (error) {
            dispatch(sellerLogin(false))
            console.log(error.response?.data?.message)
        }
    }
}

export function getSellerOrderAction() {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(backend_url + "/api/order/seller-orders", { withCredentials: true })
            if (data.success) {
                dispatch(setSellerOrder(data.data))
            }
        } catch (error) {
            console.log(error.response?.data?.message)
        }
    }
}

export function getSellerConversationsAction() {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(backend_url + "/api/conversation/get-seller-conversations", { withCredentials: true })
            if (data.success) {
                dispatch(setSellerConversations(data.conversationsData))
            }
        } catch (error) {
            console.log(error.response?.data?.message)
        }
    }
}

export function getOnlineUsersAction(id) {
    return function (dispatch) {
        // const seller = getState().shop.seller;

        if (!id) return;

        socket.emit("addUser", id);

        socket.on("getUsers", (users) => {
            dispatch(setOnlineUsers(users));
        });
    };
}

export function getEventsAction(id) {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(backend_url + `/api/event/events-of-shop/${id}`, { withCredentials: true })
            if (data.success) {
                dispatch(setEvents(data.data))
            }
        } catch (error) {
            console.log(error.response?.data?.message)
        }
    }
}