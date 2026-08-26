export function setAllProductsReducer(state, action){
    state.allProducts = action.payload
}

export function setShopProductsReducer(state, action){
    state.shopProducts = action.payload
} 

export function deleteProductReducer(state, action) {
    state.allProducts = state.allProducts.filter((product)=>product._id !== action.payload)
}

export function setLoadingReducer(state, action) {
    state.loading = action.payload
}
