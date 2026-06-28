import { createContext, useContext, useEffect, useState } from "react";
import { userContext } from "./UserContext";

export const cartContext = createContext()

export function CartContextProvider({ children }) {
    const [cart, setCart] = useState([])
    const {userData} = useContext(userContext)

    // load cart from local storage
    useEffect(()=>{
        if(!userData) return
        const savedCart = localStorage.getItem(`cart_${userData._id}`)
        if(savedCart){
            setCart(JSON.parse(savedCart))
        }else{
            setCart([])
        }
    }, [userData])

    // add product into cart
    function addToCart(product, quantity=1) {
        const isProductExists = cart.find((item)=>item.product._id===product._id)
        if(isProductExists){
            const updatedCart = cart.map((item)=>{
                if(item.product._id===product._id){
                    return {
                        ...item,
                        quantity : item.quantity+quantity
                    }
                }
                return item
            })
            setCart(updatedCart)
        }else{
            setCart([...cart, 
            {
                product, quantity:quantity
            }])
        }
    }

    // remove product from cart
    function removeFromCart(product) {
        const updatedCart = cart.filter((item)=>item.product._id !== product._id)
        setCart(updatedCart)
    }
    
    //increase quantity
    function increaseQuantity(id){
        const updatedCart = cart.map((item)=>{
            if(item.product._id === id){
                return{
                    ...item,
                    quantity: item.quantity+1
                }
            }
            return item
        })
        setCart(updatedCart)
    }

    //decrease quantity
    function decreaseQuantity(id) {
        const updatedCart = cart.map((item)=>{
            if(item.product._id===id){
                if(item.quantity===1){
                    return item
                }
                return{
                    ...item,
                    quantity: item.quantity-1
                }
            }
            return item
        })
        setCart(updatedCart)
    }

    // save cart into localStorage
    useEffect(()=>{
        if(!userData) return
        if(userData._id){
            localStorage.setItem(`cart_${userData._id}`, JSON.stringify(cart))
        }
    },[cart])


    const values = {
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity
    }

    return <cartContext.Provider value={values}>
        {children}
    </cartContext.Provider>
}


