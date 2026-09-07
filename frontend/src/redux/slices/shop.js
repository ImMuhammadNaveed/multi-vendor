import { createSlice } from '@reduxjs/toolkit'
import {
    getShop,
    getSeller,
    getAllSellers,
    getSellerConversations,
    deleteSeller,
    getSellerUnreadMessages,
    logoutSeller
} from '../thunks/shop'

const initialState = {
    shop: {},
    seller: {},
    allSellers: [],
    sellerLogin: false,
    sellerChecked: false,
    sellerConversations: [],
    onlineUsers: [],
    shopLoading: false,
    sellerLoading: false,
    allSellersLoading: true,
    sellerConversationsLoading: true,
    deleteSellerLoading: false,
    logoutSellerLoading: false,
}

const shopSlice = createSlice({
    name: "shop",
    initialState,
    reducers: {
        setOnlineUsers(state, action) {
            state.onlineUsers = action.payload
        },
        setSellerUnreadMessages(state, action) {
            state.sellerConversations = state.sellerConversations.map((conv) =>
                conv._id === action.payload.conversationId
                    ? { ...conv, unreadCount: action.payload.count }
                    : conv
            )
        },
        updateSellerConversation(state, action) {
            state.sellerConversations = state.sellerConversations.map((conv) =>
                conv._id === action.payload.conversationId
                    ? {
                        ...conv,
                        lastMessage: action.payload.lastMessage,
                        lastMessageId: action.payload.sender
                    }
                    : conv
            )
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getShop.pending, (state, action) => {
                state.shopLoading = true
                state.shop = {}
            })
            .addCase(getShop.fulfilled, (state, action) => {
                state.shopLoading = false
                state.shop = action.payload
            })
            .addCase(getShop.rejected, (state, action) => {
                state.shopLoading = false
                state.shop = {}
            })
            .addCase(getSeller.pending, (state, action) => {
                state.sellerLoading = true
                state.seller = {}
            })
            .addCase(getSeller.fulfilled, (state, action) => {
                state.sellerLoading = false
                state.seller = action.payload
                state.sellerLogin = true
                state.sellerChecked = true
            })
            .addCase(getSeller.rejected, (state, action) => {
                state.sellerLoading = false
                state.sellerLogin = false
                state.sellerChecked = true
                state.seller = {}
            })
            .addCase(getAllSellers.pending, (state, action) => {
                state.allSellersLoading = true
            })
            .addCase(getAllSellers.fulfilled, (state, action) => {
                state.allSellersLoading = false
                state.allSellers = action.payload
            })
            .addCase(getAllSellers.rejected, (state, action) => {
                state.allSellersLoading = false
            })
            .addCase(getSellerConversations.pending, (state, action) => {
                state.sellerConversationsLoading = true
                state.sellerConversations = []
            })
            .addCase(getSellerConversations.fulfilled, (state, action) => {
                state.sellerConversationsLoading = false
                state.sellerConversations = action.payload
            })
            .addCase(getSellerConversations.rejected, (state, action) => {
                state.sellerConversationsLoading = false
                state.sellerConversations = []
            })
            .addCase(deleteSeller.pending, (state, action) => {
                state.deleteSellerLoading = true
            })
            .addCase(deleteSeller.fulfilled, (state, action) => {
                state.deleteSellerLoading = false
                state.allSellers = state.allSellers.filter((seller) => seller._id !== action.payload.id)
            })
            .addCase(deleteSeller.rejected, (state, action) => {
                state.deleteSellerLoading = false
            })
            .addCase(getSellerUnreadMessages.fulfilled, (state, action) => {
                state.sellerConversations = state.sellerConversations.map((conv) =>
                    conv._id === action.payload.conversationId
                        ? { ...conv, unreadCount: action.payload.count }
                        : conv
                )
            })
            .addCase(logoutSeller.pending, (state, action)=>{
                state.logoutSellerLoading = true
            })
            .addCase(logoutSeller.fulfilled, (state, action)=>{
                state.logoutSellerLoading = false
                state.sellerLogin = false
                state.sellerConversations = []
            })
            .addCase(logoutSeller.rejected, (state, action)=>{
                state.logoutSellerLoading = false
            })
    }
})

export const { setOnlineUsers, sellerLogout, setSellerUnreadMessages, updateSellerConversation } = shopSlice.actions
export default shopSlice.reducer
