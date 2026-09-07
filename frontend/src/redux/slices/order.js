import { createSlice } from "@reduxjs/toolkit";
import {
    getAllOrders,
    getSellerOrders,
    getUserOrders
} from "../thunks/order"
import { act } from "react";
import { logoutUser } from "../thunks/user";
import { logoutSeller } from "../thunks/shop";

const initialState = {
    allOrdersLoading: true,
    sellerOrdersLoading: true,
    userOrdersLoading: true,
    allOrders: [],
    sellerOrders: [],
    userOrders: [],
}




const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllOrders.pending, (state) => {
                state.allOrdersLoading = true
            })
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.allOrdersLoading = false
                state.allOrders = action.payload
            })
            .addCase(getAllOrders.rejected, (state) => {
                state.allOrdersLoading = false
            })
            .addCase(getSellerOrders.pending, (state) => {
                state.sellerOrdersLoading = true
                state.sellerOrders = []
            })
            .addCase(getSellerOrders.fulfilled, (state, action) => {
                state.sellerOrdersLoading = false
                state.sellerOrders = action.payload
            })
            .addCase(getSellerOrders.rejected, (state) => {
                state.sellerOrdersLoading = false
                state.sellerOrders = []
            })
            .addCase(getUserOrders.pending, (state) => {
                state.userOrdersLoading = true
                state.userOrders = []
            })
            .addCase(getUserOrders.fulfilled, (state, action) => {
                state.userOrdersLoading = false
                state.userOrders = action.payload
            })
            .addCase(getUserOrders.rejected, (state) => {
                state.userOrdersLoading = false
                state.userOrders = []
            })
            .addCase(logoutUser.fulfilled, (state, action)=>{
                state.userOrders = []
            })
            .addCase(logoutSeller.fulfilled, (state, action)=>{
                state.sellerOrders = []
            })
    }
})
export default orderSlice.reducer
