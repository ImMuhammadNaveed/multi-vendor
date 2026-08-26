import { createSlice } from '@reduxjs/toolkit'
import {
    setUserReducer,
    setUserLoginReducer,
    setUserCheckedReducer,
    setUserConversationsReducer,
    updateUserConversationReducer,
    setOnlineUsersReducer,
    setUsersReducer,
    deleteUserReducer,
    setUserUnreadMessagesReducer,
    setLoadingReducer
} from '../reducers/user'

const initialState = {
    user: {},
    userLogin: false,
    userChecked: false,
    userConversations: [],
    onlineUsers: [],
    allUsers: [],
    loading: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: setUserReducer,
        setUserLogin: setUserLoginReducer,
        setUserChecked: setUserCheckedReducer,
        setUserConversations: setUserConversationsReducer,
        updateUserConversation: updateUserConversationReducer,
        setOnlineUsers: setOnlineUsersReducer,
        setUsers: setUsersReducer,
        deleteUser: deleteUserReducer,
        setUserUnreadMessages: setUserUnreadMessagesReducer,
        setLoading: setLoadingReducer
    }
})

export const {
    setUser,
    setUserLogin,
    setUserChecked,
    setUserOrders,
    setUserConversations,
    updateUserConversation,
    setOnlineUsers,
    setUsers,
    deleteUser,
    setUserUnreadMessages,
    setLoading
} = userSlice.actions
export default userSlice.reducer