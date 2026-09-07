import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { logoutUser } from '../thunks/user'


export const loadCart = () => (dispatch, getState) => {
    const userData = getState().user.user
    if (!userData) {
        dispatch(setCart([]))
        return
    }
    const savedCart = localStorage.getItem(`cart_${userData._id}`)
    dispatch(setCart(savedCart ? JSON.parse(savedCart) : []))
}


export const addToCart = (product, quantity = 1) => (dispatch, getState) => {
    const userData = getState().user.user
    if (!getState().user.userLogin) {
        toast.error("user not logged in")
        return
    }
    const currentCart = getState().cart.cart
    const existingItem = currentCart.find((item) => item.product._id === product._id)
    let updatedCart
    if (existingItem) {
        updatedCart = currentCart.map((item) => {
            if (item.product._id === product._id) {
                return {
                    ...item,
                    quantity: item.quantity + quantity
                }
            }
            return item
        })
    } else {
        updatedCart = [
            ...currentCart,
            {
                product, quantity
            }
        ]
    }
    dispatch(setCart(updatedCart))
    localStorage.setItem(`cart_${userData._id}`, JSON.stringify(updatedCart))
    toast.success("Item Successfully added in cart!")
}


export const removeFromCart = (productId) => (dispatch, getState) => {
    const currentCart = getState().cart.cart
    const userData = getState().user.user
    const updatedCart = currentCart.filter((item) => item.product._id !== productId)
    dispatch(setCart(updatedCart))
    localStorage.setItem(`cart_${userData._id}`, JSON.stringify(updatedCart))
}

export const increaseQuantity = (productId) => (dispatch, getState) => {
    const currentCart = getState().cart.cart
    const userData = getState().user.user
    const updatedCart = currentCart.map((item) => {
        if (item.product._id === productId) {
            return {
                ...item,
                quantity: item.quantity + 1
            }
        }
        return item
    })
    dispatch(setCart(updatedCart))
    localStorage.setItem(
        `cart_${userData._id}`,
        JSON.stringify(updatedCart)
    );
}

export const decreaseQuantity = (productId) => (dispatch, getState) => {
    const currentCart = getState().cart.cart
    const userData = getState().user.user
    const updatedCart = currentCart.map((item) => {
        if (item.product._id === productId) {
            if (item.quantity === 1) {
                return item
            }
            return {
                ...item,
                quantity: item.quantity - 1
            }
        }
        return item
    })
    dispatch(setCart(updatedCart))
    localStorage.setItem(
        `cart_${userData._id}`,
        JSON.stringify(updatedCart)
    );
}





const initialState = {
    cart: []
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart(state, action) {
            state.cart = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.cart = []
            })
    }
})
export const { setCart } = cartSlice.actions
export default cartSlice.reducer