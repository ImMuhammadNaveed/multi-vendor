import { createSlice } from "@reduxjs/toolkit";
import {
    setAllOrdersReducer,
    setSellerOrdersReducer,
    setUserOrdersReducer
} from "../reducers/order"

const initialState = {
    allOrders: [],
    sellerOrders: [],
    userOrders: [],
}




const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setAllOrders: setAllOrdersReducer,
        setSellerOrders: setSellerOrdersReducer,
        setUserOrders: setUserOrdersReducer
    }
})
export default orderSlice.reducer
export const { setAllOrders, setSellerOrders, setUserOrders } = orderSlice.actions