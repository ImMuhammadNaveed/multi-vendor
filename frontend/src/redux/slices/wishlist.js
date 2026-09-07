import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { logoutUser } from '../thunks/user'


export const loadWishlist = () => (dispatch, getState) => {
    const userData = getState().user.user
    if (!userData) {
        dispatch(setWishlist([]))
        return
    }
    const savedWishlist = localStorage.getItem(`wishlist_${userData._id}`)
    dispatch(
        setWishlist(savedWishlist ? JSON.parse(savedWishlist) : [])
    )
}

export const addToWishlist = (product) => (dispatch, getState) => {
    const userData = getState().user.user
    const currentWishlist = getState().wishlist.wishlist
    const isProductExists = currentWishlist.find((item) => item.product._id === product._id)
    let updatedWishList
    if (!isProductExists) {
        updatedWishList=[
            ...currentWishlist,
            {product: product}
        ]
    }
    dispatch(setWishlist(updatedWishList))
    localStorage.setItem(`wishlist_${userData._id}`, JSON.stringify(updatedWishList))
    toast.success("Item successfully added into wishlist!")
}

export const removeFromWishlist = (product) => (dispatch, getState) => {
    const currentWishlist = getState().wishlist.wishlist
    const userData = getState().user.user
    const updatedWishList = currentWishlist.filter((item) => item.product._id !== product._id)
    dispatch(setWishlist(updatedWishList))
    localStorage.setItem(`wishlist_${userData._id}`, JSON.stringify(updatedWishList))
}

export const isInWishlist=(productId, wishlist)=> {
    return wishlist.some((item) => item.product._id === productId)
}

const initialState = {
    wishlist: []
}

export const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        setWishlist(state, action){
            state.wishlist = action.payload
        }
    },
    extraReducers: (builder)=>{
        builder
            .addCase(logoutUser.fulfilled, (state, action)=>{
                state.wishlist = []
            })
    }
})
export const { setWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer