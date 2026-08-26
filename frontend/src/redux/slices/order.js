import { createSlice } from "@reduxjs/toolkit";
import {
    setAllOrdersReducer,
    setLoadingReducer,
    setSellerOrdersReducer,
    setUserOrdersReducer
} from "../reducers/order"

const initialState = {
    loading: false,
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
        setUserOrders: setUserOrdersReducer,
        setLoading: setLoadingReducer
    }
})
export default orderSlice.reducer
export const { setAllOrders, setSellerOrders, setUserOrders, setLoading } = orderSlice.actions