import { createContext, useEffect } from "react";
export const productContext = createContext()
import { useState } from "react";
import axios from 'axios'

export function ProductContextProvider({ children }) {
    const backend_url = import.meta.env.VITE_BACKEND_URL
    const [allProducts, setAllProducts] = useState([])
    const [shopProducts, setShopProducts] = useState(null)

    
    async function getAllProducts() {
        try {
            const {data} = await axios.get(backend_url+"/api/product/all-products", {withCredentials: true})
            // console.log(data)
            if(data.success){
                setAllProducts(data.data)
            }
        } catch (error) {
            console.log(error.response.data.message)
        }
    }
    async function getProductsOfShop(id) {
        try {
            const { data } = await axios.get(backend_url + `/api/product/all-products-of-shop/${id}`, { withCredentials: true })
            // alert(data.message)
            if (data.success) {
                setShopProducts(data.data)
                console.log("shop products: ",data.data)
            }
        } catch (error) {
            console.log(error.response.data.message)
        }
    }
    useEffect(()=>{getAllProducts()},[])
    const values = {
        backend_url,
        allProducts,
        shopProducts,
        getProductsOfShop
    }
    return <productContext.Provider value={values}>
        {children}
    </productContext.Provider>
}