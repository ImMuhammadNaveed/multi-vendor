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
    setUserUnreadMessagesReducer
} from '../reducers/user'

const initialState = {
    user: {},
    userLogin: false,
    userChecked: false,
    userConversations: [],
    onlineUsers: [],
    allUsers: []
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
        setUserUnreadMessages: setUserUnreadMessagesReducer
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
    setUserUnreadMessages
} = userSlice.actions
export default userSlice.reducer