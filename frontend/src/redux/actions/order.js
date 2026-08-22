import {
    setAllOrders, 
    setSellerOrders, 
    setUserOrders
} from "../slices/order"
import axios from "axios"
import { backend_url } from "../../server"

export function getAllOrdersAction() {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(backend_url + "/api/order/all-orders", { withCredentials: true })
            // console.log("all orders: ", data)
            if (data.success) {
                dispatch(setAllOrders(data.orders))
            }
        } catch (error) {
            console.log(error.response)
        }
    }
}

export function getSellerOrdersAction() {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(backend_url + "/api/order/seller-orders", { withCredentials: true })
            // console.log(data)
            if (data.success) {
                dispatch(setSellerOrders(data.data))
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