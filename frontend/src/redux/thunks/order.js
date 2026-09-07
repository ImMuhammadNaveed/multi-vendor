import axios from "axios"
import { backend_url } from "../../server"
import { createAsyncThunk } from "@reduxjs/toolkit"



export const getAllOrders = createAsyncThunk(
    'order/getAllOrders',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(backend_url + "/api/order/all-orders", { withCredentials: true })
            if (!data.success) {
                return rejectWithValue(data.message || "Failed to get all orders")
            }
            return data.orders
        } catch (error) {
            console.log(error.response)
            return rejectWithValue(error.response?.data?.message || "Failed to get all orders")
        }
    }
)

export const getSellerOrders = createAsyncThunk(
    'order/getSellerOrders',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(backend_url + "/api/order/seller-orders", { withCredentials: true })
            if (!data.success) {
                return rejectWithValue(data.message || "Failed to get all orders")
            }
            return data.data
        } catch (error) {
            console.log(error.response)
            return rejectWithValue(error.response?.data?.message || "Failed to get seller orders")
        }
    }
)

export const getUserOrders = createAsyncThunk(
    'order/getUserOrders',
    async (_, {rejectWithValue})=>{
        try {
            const { data } = await axios.get(backend_url + "/api/order/user-orders", { withCredentials: true })
            if (!data.success) {
                return rejectWithValue(data.message || "Failed to get all orders")
            }
            return data.data
        } catch (error) {
            console.log(error.response)
            return rejectWithValue(error.response?.data?.message || "Failed to get user orders")
        }
    }
)