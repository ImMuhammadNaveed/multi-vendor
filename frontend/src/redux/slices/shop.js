import { createSlice } from '@reduxjs/toolkit'
import {
    setShopReducer,
    setSellerReducer,
    sellerLoginReducer,
    setSellerOrderReducer,
    setSellerConversationsReducer,
    updateConversationReducer,
    setOnlineUsersReducer,
    setEventsReducer
} from '../reducers/shop'

const initialState = {
    shop: {},
    seller: {},
    sellerLogin: false,
    sellerOrders: [],
    sellerConversations: [],
    onlineUsers: [],
    events: []
}

const shopSlice = createSlice({
    name: "shop",
    initialState,
    reducers: {
        setShop: setShopReducer,
        setSeller: setSellerReducer,
        sellerLogin: sellerLoginReducer,
        setSellerOrder: setSellerOrderReducer,
        setSellerConversations: setSellerConversationsReducer,
        updateConversation: updateConversationReducer,
        setOnlineUsers: setOnlineUsersReducer,
        setEvents: setEventsReducer
    }
})

export const {
    setShop,
    setSeller,
    sellerLogin,
    setSellerOrder,
    setSellerConversations,
    setOnlineUsers,
    setEvents
} = shopSlice.actions
export default shopSlice.reducer