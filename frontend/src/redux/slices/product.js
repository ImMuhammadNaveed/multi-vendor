import {createSlice} from '@reduxjs/toolkit'
import { setAllProductsReducer, setShopProductsReducer } from '../reducers/product'

const initialState = {
    shopProducts : [],
    allProducts : [],
    loading : false,
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers:{
        setAllProducts: setAllProductsReducer,
        setShopProducts: setShopProductsReducer
    }
})


export const {setAllProducts, setShopProducts} = productSlice.actions
export default productSlice.reducer