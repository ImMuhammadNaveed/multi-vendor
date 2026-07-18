import { setAllProducts } from "../slices/product";

export function setAllProductsReducer(state, action){
    state.allProducts = action.payload
}

export function setShopProductsReducer(state, action){
    state.shopProducts = action.payload
} 