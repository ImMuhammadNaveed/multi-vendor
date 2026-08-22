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
    setSellerUnreadMessagesReducer
} from '../reducers/shop'

const initialState = {
    shop: {},
    seller: {},
    allSellers: [],
    sellerLogin: false,
    sellerChecked: false,
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
        setAllSellers: setAllSellersReducer,
        sellerLogin: sellerLoginReducer,
        sellerChecked: sellerCheckedReducer,
        sellerLogout: sellerLogoutReducer,
        setSellerConversations: setSellerConversationsReducer,
        updateSellerConversation: updateSellerConversationReducer,
        setOnlineUsers: setOnlineUsersReducer,
        setEvents: setEventsReducer,
        deleteSeller: deleteSellerReducer,
        setSellerUnreadMessages: setSellerUnreadMessagesReducer
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
    setSellerUnreadMessages
} = shopSlice.actions
export default shopSlice.reducer