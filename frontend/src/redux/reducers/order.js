export function setAllOrdersReducer(state, action) {
    state.allOrders = action.payload
}

export function setSellerOrdersReducer(state, action) {
    state.sellerOrders = action.payload
}

export function setUserOrdersReducer(state, action) {
    state.userOrders = action.payload
}

export function setLoadingReducer(state, action) {
    state.loading = action.payload
}
