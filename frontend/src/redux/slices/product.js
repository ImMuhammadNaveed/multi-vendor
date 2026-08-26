import {createSlice} from '@reduxjs/toolkit'
import { 
    deleteProductReducer,
    setAllProductsReducer, 
    setLoadingReducer, 
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
        setLoading: setLoadingReducer
    }
})


export const {setAllProducts, setShopProducts, deleteProduct, setLoading} = productSlice.actions
export default productSlice.reducer