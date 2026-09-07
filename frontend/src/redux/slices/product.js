import { createSlice } from '@reduxjs/toolkit'
import {
    deleteProduct,
    getAllProducts,
    getShopProducts
} from '../thunks/product'

const initialState = {
    shopProducts: [],
    allProducts: [],
    allProductsLoading: true,
    shopProductsLoading: true,
    deleteProductLoading: false,
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.allProductsLoading = true
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.allProductsLoading = false
                state.allProducts = action.payload
            })
            .addCase(getAllProducts.rejected, (state) => {
                state.allProductsLoading = false
            })
            .addCase(getShopProducts.pending, (state) => {
                state.shopProductsLoading = true
                state.shopProducts = []
            })
            .addCase(getShopProducts.fulfilled, (state, action) => {
                state.shopProductsLoading = false
                state.shopProducts = action.payload
            })
            .addCase(getShopProducts.rejected, (state) => {
                state.shopProductsLoading = false
                state.shopProducts = []
            })
            .addCase(deleteProduct.pending, (state) => {
                state.deleteProductLoading = true
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.deleteProductLoading = false
                state.allProducts = state.allProducts.filter((product)=>product._id !== action.payload)
            })
            .addCase(deleteProduct.rejected, (state) => {
                state.deleteProductLoading = false
            })
    }
})



export default productSlice.reducer
