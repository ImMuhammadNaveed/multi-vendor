export function setUserReducer(state, action) {
    state.user = action.payload
}

export function setUserLoginReducer(state, action) {
    state.userLogin = action.payload
}

export function setUserCheckedReducer(state, action) {
    state.userChecked = action.payload
}

export function setUserConversationsReducer(state, action) {
    state.userConversations = action.payload
}

export function updateUserConversationReducer(state, action) {
    state.userConversations = state.userConversations.map((conv) =>
        conv._id === action.payload.conversationId
            ? {
                ...conv,
                lastMessage: action.payload.lastMessage,
                lastMessageId: action.payload.sender
            }
            : conv
    )
    console.log("updated conversation: ", state.userConversations)
}

export function setOnlineUsersReducer(state, action) {
    state.onlineUsers = action.payload
}

export function setUsersReducer(state, action) {
    state.allUsers = action.payload
}

export function deleteUserReducer(state, action) {
    state.allUsers = state.allUsers.filter((user) => user._id !== action.payload)
}

export function setUserUnreadMessagesReducer(state, action) {
    state.userConversations = state.userConversations.map((conv) =>
        conv._id === action.payload.conversationId
            ? { ...conv, unreadCount: action.payload.count }
            : conv
    )
}