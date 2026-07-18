import { createSlice } from '@reduxjs/toolkit'
import {
    setUserReducer,
    userLoginReducer,
    setUserOrdersReducer,
    setUserConversationsReducer,
    updateConversationReducer,
    setOnlineUsersReducer
} from '../reducers/user'

const initialState = {
    user: {},
    userLogin: false,
    userOrders: [],
    userConversations: [],
    onlineUsers: []
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: setUserReducer,
        userLogin: userLoginReducer,
        setUserOrders: setUserOrdersReducer,
        setUserConversations: setUserConversationsReducer,
        updateConversation: updateConversationReducer,
        setOnlineUsers: setOnlineUsersReducer
    }
})

export const {
    setUser,
    userLogin,
    setUserOrders,
    setUserConversations,
    setOnlineUsers
} = userSlice.actions
export default userSlice.reducer