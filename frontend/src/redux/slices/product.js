import {createSlice} from '@reduxjs/toolkit'
import { 
    deleteProductReducer,
    setAllProductsReducer, 
    setShopProductsReducer 
} from '../reducers/product'

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
        setShopProducts: setShopProductsReducer,
        deleteProduct: deleteProductReducer,
    }
})


export const {setAllProducts, setShopProducts, deleteProduct} = productSlice.actions
export default productSlice.reducer