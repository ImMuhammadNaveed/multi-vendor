export function setShopReducer(state, action) {
    state.shop = action.payload
}

export function setSellerReducer(state, action) {
    state.seller = action.payload
}

export function setAllSellersReducer(state, action) {
    state.allSellers = action.payload
}

export function sellerLoginReducer(state, action) {
    state.sellerLogin = action.payload
}

export function sellerCheckedReducer(state, action) {
    state.sellerChecked = action.payload
}

export function setSellerConversationsReducer(state, action) {
    state.sellerConversations = action.payload
}

export function updateSellerConversationReducer(state, action) {
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

export function setOnlineUsersReducer(state, action) {
    state.onlineUsers = action.payload
}

export function setEventsReducer(state, action) {
    state.events = action.payload
}

export function deleteSellerReducer(state, action) {
    state.allSellers = state.allSellers.filter((seller)=> seller._id !== action.payload)
}

export function sellerLogoutReducer(state, action){
    state.seller = {}
    state.sellerLogin = false
}

export function setSellerUnreadMessagesReducer(state, action) {
    // console.log("action.payload in seller unread reducer: ", action.payload)
    state.sellerConversations = state.sellerConversations.map((conv) =>
        conv._id === action.payload.conversationId
            ? { ...conv, unreadCount: action.payload.count }
            : conv
    )
}

export function setLoadingReducer(state, action) {
    state.loading = action.payload
}
