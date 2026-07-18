import { createSlice } from '@reduxjs/toolkit'
import { setWishlistReducer, addToWishlistReducer, removeFromWishlistReducer } from '../reducers/wishlist'

const initialState = {
    wishlist: [],
    loading: true
}

export const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        setWishlist: setWishlistReducer,
        addToWishlist: addToWishlistReducer,
        removeFromWishlist: removeFromWishlistReducer,
    }
})
export const { setWishlist, addToWishlist, removeFromWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer