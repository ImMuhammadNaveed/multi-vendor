export function setShopReducer(state, action) {
    state.shop = action.payload
}

export function setSellerReducer(state, action) {
    state.seller = action.payload
}

export function sellerLoginReducer(state, action) {
    state.sellerLogin = action.payload
}

export function setSellerOrderReducer(state, action) {
    state.sellerOrders = action.payload
}

export function setSellerConversationsReducer(state, action) {
    state.sellerConversations = action.payload
}

export function updateConversationReducer(state, action) {
    state.sellerConversations.map((conv) =>
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

export function setEventsReducer(state, action) {
    state.events = action.payload
}