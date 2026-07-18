import { createSlice } from '@reduxjs/toolkit'
import { setCartReducer, addToCartReducer, removeFromCartReducer } from '../reducers/cart'

const initialState = {
    cart: [],
    loading: true
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart: setCartReducer,
        addToCart: addToCartReducer,
        removeFromCart: removeFromCartReducer,
    }
})
export const { setCart, addToCart, removeFromCart } = cartSlice.actions
export default cartSlice.reducer