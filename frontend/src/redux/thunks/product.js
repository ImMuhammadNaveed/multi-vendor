import axios from "axios"
import { backend_url } from "../../server"
import { createAsyncThunk } from "@reduxjs/toolkit"


export const getAllProducts = createAsyncThunk(
    "product/getAllProducts",
    async (_, {rejectWithValue})=> {
        try {
            const { data } = await axios.get(backend_url + "/api/product/all-products", { withCredentials: true })
            if (!data.success) {
                return rejectWithValue(data.message || "Failed to get all products")
            }
            return data.products
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to get all products")
        }
    }
)

export const getShopProducts = createAsyncThunk(
    "product/getShopProducts",
    async (id, {rejectWithValue})=>{
        try {
            const { data } = await axios.get(backend_url + `/api/product/all-products-of-shop/${id}`, { withCredentials: true })
            if (!data.success) {
                return rejectWithValue(data.message || "Failed to get shop products")
            }
            return data.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to get shop products")
        }
    }
)

export const deleteProduct = createAsyncThunk(
    'product/deleteProduct',
    async (id, {rejectWithValue})=>{
        try {
            const { data } = await axios.delete(backend_url + `/api/product/delete-product/${id}`, { withCredentials: true })
            if (!data.success) {
                return rejectWithValue(data.message || "Failed to delete product")
            }
            return id
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response?.data?.message || "Failed to delete product")
        }
    }
)