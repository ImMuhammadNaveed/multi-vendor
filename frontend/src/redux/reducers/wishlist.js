export function setWishlistReducer(state, action) {
    state.wishlist = action.payload
}

export function addToWishlistReducer(state, action) {
    const isProductExists = state.wishlist.find((item) => item.product._id === action.payload._id)
    if (!isProductExists) {
        state.wishlist.push({product: action.payload})
    }
}

export function removeFromWishlistReducer(state, action) {
    state.wishlist = state.wishlist.filter((item) => item.product._id !== action.payload._id)
}