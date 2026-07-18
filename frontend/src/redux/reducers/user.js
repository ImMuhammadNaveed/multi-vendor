export function setUserReducer(state, action) {
    state.user = action.payload
}

export function userLoginReducer(state, action) {
    state.userLogin = action.payload
}

export function setUserOrdersReducer(state, action) {
    state.userOrders = action.payload
}

export function setUserConversationsReducer(state, action) {
    state.userConversations = action.payload
}

export function updateConversationReducer(state, action) {
    state.userConversations.map((conv) =>
        conv._id === action.payload.conversationId
            ? {
                ...conv,
                lastMessage: action.payload.lastMessage,
                lastMessageId: action.payload.sender
            }
            : conv
    )
}

export function setOnlineUsersReducer(state, action) {
    state.onlineUsers = action.payload
}
