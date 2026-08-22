import { setCart, removeFromCart, addToCart } from "../slices/cart"
import { toast } from "react-toastify"
export function loadCartAction(userData) {
    return function (dispatch) {
        if (!userData) {
            dispatch(setCart([]))
            return
        }
        const savedCart = localStorage.getItem(`cart_${userData._id}`)
        dispatch(
            setCart(savedCart ? JSON.parse(savedCart) : [])
        )
    }
}

export function addToCartAction(data, userData, quantity = 1) {
    return function (dispatch, getState) {
        if (!getState().user.userLogin) {
            toast.error("user not logged in")
            return
        }
        dispatch(addToCart({ product: data, quantity }))
        localStorage.setItem(`cart_${userData._id}`, JSON.stringify(getState().cart.cart))
        toast.success("Item Successfully added in cart!")
    }
}

export function removeFromCartAction(data, userData) {
    return function (dispatch, getState) {
        dispatch(removeFromCart(data))
        localStorage.setItem(`cart_${userData._id}`, JSON.stringify(getState().cart.cart))
    }
}

//increase quantity
export function increaseQuantityAction(id, cart, userData) {
    return function (dispatch) {
        const updatedCart = cart.map((item) => {
            if (item.product._id === id) {
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
}

//decrease quantity
export function decreaseQuantityAction(id, cart, userData) {
    return function (dispatch) {
        const updatedCart = cart.map((item) => {
            if (item.product._id === id) {
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
}

