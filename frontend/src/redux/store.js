import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "./slices/wishlist";
import cartReducer from './slices/cart'
import productReducer from './slices/product'
import shopReducer from './slices/shop'
import userReducer from './slices/user'

export const store = configureStore({
    reducer: {
        wishlist: wishlistReducer,
        cart: cartReducer,
        product: productReducer,
        shop: shopReducer,
        user: userReducer,
    }
})

