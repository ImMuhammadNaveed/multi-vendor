import { createContext, useContext, useEffect, useState } from "react";
import { userContext } from "./UserContext";

export const wishlistContext = createContext()

export function WishlistContextProvider({ children }) {
    const [wishlist, setWishlist] = useState([])
    const {userData} = useContext(userContext)

    // load wishlist from local storage
    useEffect(()=>{
        if(!userData) return
        const savedWishlist = localStorage.getItem(`wishlist_${userData._id}`)
        if(savedWishlist){
            setWishlist(JSON.parse(savedWishlist))
        }else{
            setWishlist([])
        }
    }, [userData])

    // add product into wishlist
    function addToWishlist(product) {
        const isProductExists = wishlist.find((item)=>item.product._id===product._id)
        if(!isProductExists){
            setWishlist(
                [...wishlist, {product}]
            )
        }
    }

    // remove product from wishlist
    function removeFromWishlist(product) {
        const updatedWishlist = wishlist.filter((item)=>item.product._id !== product._id)
        setWishlist(updatedWishlist)
    }

    //check if present in wishlist
    function isInWishlist(product) {
        return wishlist.some((item)=>item.product._id===product._id)
    }
    
    // save wishlist into localStorage
    useEffect(()=>{
        if(!userData) return
        if(userData._id){
            localStorage.setItem(`wishlist_${userData._id}`, JSON.stringify(wishlist))
        }
    },[wishlist])

    const values = {
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist
    }

    return <wishlistContext.Provider value={values}>
        {children}
    </wishlistContext.Provider>
}


