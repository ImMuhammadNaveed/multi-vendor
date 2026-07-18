import { setWishlist, removeFromWishlist, addToWishlist } from "../slices/wishlist" 
export function loadWishlistAction(userData) {
    return function (dispatch) {
        if (!userData) {
            dispatch(setWishlist([]))
            return
        }
        const savedWishlist = localStorage.getItem(`wishlist_${userData._id}`)
        dispatch(
            setWishlist(savedWishlist ? JSON.parse(savedWishlist) : [])
        )
    }
}

export function addToWishlistAction(data, userData) {
    return function (dispatch, getState) {
        dispatch(addToWishlist(data))
        localStorage.setItem(`wishlist_${userData._id}`, JSON.stringify(getState().wishlist.wishlist))
    }
    
}

export function removeFromWishlistAction(data, userData) {
    return function (dispatch, getState) {
        dispatch(removeFromWishlist(data))
        localStorage.setItem(`wishlist_${userData._id}`, JSON.stringify(getState().wishlist.wishlist))
    }
}

export function isInWishlistAction(wishlist, productId) {
    return wishlist.some((item) => item.product._id === productId)
}