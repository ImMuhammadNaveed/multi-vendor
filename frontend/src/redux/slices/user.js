import { createSlice } from '@reduxjs/toolkit'
import {
    getUser,
    getUserConversations,
    getAllUsers,
    deleteUser,
    getUserUnreadMessages,
    addUserAddress,
    deleteUserAddress,
    logoutUser
} from '../thunks/user'

const initialState = {
    user: {},
    userLogin: false,
    userChecked: false,
    userConversations: [],
    onlineUsers: [],
    allUsers: [],
    userLoading: false,
    userConversationsLoading: true,
    allUsersLoading: true,
    deleteUserLoading: false,
    addUserAddressLoading: false,
    deleteUserAddressLoading: false,
    logoutUserLoading: false,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUserConversation(state, action) {
            state.userConversations = state.userConversations.map((conv) =>
                conv._id === action.payload.conversationId
                    ? {
                        ...conv,
                        lastMessage: action.payload.lastMessage,
                        lastMessageId: action.payload.sender
                    }
                    : conv
            )
        },
        setOnlineUsers(state, action){
            state.onlineUsers = action.payload
        },
        setUserUnreadMessages(state, action) {
            // console.log("action.payload in seller unread reducer: ", action.payload)
            state.userConversations = state.userConversations.map((conv) =>
                conv._id === action.payload.conversationId
                    ? { ...conv, unreadCount: action.payload.count }
                    : conv
            )
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state, action) => {
                state.userLoading = true
                state.user = {}
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.userLoading = false
                state.user = action.payload
                state.userLogin = true
                state.userChecked = true
            })
            .addCase(getUser.rejected, (state, action) => {
                state.userLoading = false
                state.userLogin = false
                state.userChecked = true
                state.user = {}
            })
            .addCase(getUserConversations.pending, (state, action) => {
                state.userConversationsLoading = true
                state.userConversations = []
            })
            .addCase(getUserConversations.fulfilled, (state, action) => {
                state.userConversationsLoading = false
                state.userConversations = action.payload
            })
            .addCase(getUserConversations.rejected, (state, action) => {
                state.userConversationsLoading = false
                state.userConversations = []
            })
            .addCase(getAllUsers.pending, (state, action) => {
                state.allUsersLoading = true
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.allUsersLoading = false
                state.allUsers = action.payload
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.allUsersLoading = false
            })
            .addCase(deleteUser.pending, (state, action) => {
                state.deleteUserLoading = true
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.deleteUserLoading = false
                state.allUsers = state.allUsers.filter((user) => user._id !== action.payload.id)
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.deleteUserLoading = false
            })
            .addCase(getUserUnreadMessages.fulfilled, (state, action) => {
                state.userConversations = state.userConversations.map((conv) =>
                    conv._id === action.payload.conversationId
                        ? { ...conv, unreadCount: action.payload.count }
                        : conv
                )
            })
            .addCase(addUserAddress.pending, (state, action) => {
                state.addUserAddressLoading = true
            })
            .addCase(addUserAddress.fulfilled, (state, action) => {
                state.addUserAddressLoading = false
                state.user = action.payload
            })
            .addCase(addUserAddress.rejected, (state, action) => {
                state.addUserAddressLoading = false
            })
            .addCase(deleteUserAddress.pending, (state, action) => {
                state.deleteUserAddressLoading = true
            })
            .addCase(deleteUserAddress.fulfilled, (state, action) => {
                state.deleteUserAddressLoading = false
                state.user = action.payload
            })
            .addCase(deleteUserAddress.rejected, (state, action) => {
                state.deleteUserAddressLoading = false
            })
            .addCase(logoutUser.pending, (state, action)=>{
                state.logoutUserLoading = true
            })
            .addCase(logoutUser.fulfilled, (state, action)=>{
                state.logoutUserLoading = false
                state.user = {}
                state.userLogin = false
                state.userConversations = []
            })
            .addCase(logoutUser.rejected, (state, action)=>{
                state.logoutUserLoading = false
            })
    }
})

export const { updateUserConversation, setOnlineUsers, setUserUnreadMessages } = userSlice.actions
export default userSlice.reducer
