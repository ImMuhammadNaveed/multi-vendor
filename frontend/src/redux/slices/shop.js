import { createSlice } from '@reduxjs/toolkit'
import {
    setShopReducer,
    setSellerReducer,
    setAllSellersReducer,
    sellerLoginReducer,
    sellerCheckedReducer,
    setSellerConversationsReducer,
    updateSellerConversationReducer,
    setOnlineUsersReducer,
    setEventsReducer,
    deleteSellerReducer,
    sellerLogoutReducer,
    setSellerUnreadMessagesReducer,
    setLoadingReducer
} from '../reducers/shop'

const initialState = {
    shop: {},
    seller: {},
    allSellers: [],
    sellerLogin: false,
    sellerChecked: false,
    sellerConversations: [],
    onlineUsers: [],
    events: [],
    loading: false
}

const shopSlice = createSlice({
    name: "shop",
    initialState,
    reducers: {
        setShop: setShopReducer,
        setSeller: setSellerReducer,
        setAllSellers: setAllSellersReducer,
        sellerLogin: sellerLoginReducer,
        sellerChecked: sellerCheckedReducer,
        sellerLogout: sellerLogoutReducer,
        setSellerConversations: setSellerConversationsReducer,
        updateSellerConversation: updateSellerConversationReducer,
        setOnlineUsers: setOnlineUsersReducer,
        setEvents: setEventsReducer,
        deleteSeller: deleteSellerReducer,
        setSellerUnreadMessages: setSellerUnreadMessagesReducer,
        setLoading: setLoadingReducer
    }
})

export const {
    setShop,
    setSeller,
    setAllSellers,
    sellerLogin,
    sellerChecked,
    sellerLogout,
    setSellerOrder,
    setSellerConversations,
    updateSellerConversation,
    setOnlineUsers,
    setEvents,
    deleteSeller,
    setSellerUnreadMessages,
    setLoading
} = shopSlice.actions
export default shopSlice.reducer