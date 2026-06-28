import axios from "axios"
import ShopProfileData from "../components/shop/ShopProfileData"
import ShopSideBar from "../components/shop/ShopSideBar"
import { useContext, useEffect, useState } from "react"
import { shopContext } from "../context/ShopContext"
import { useParams } from "react-router-dom"
import { productContext } from "../context/ProductContext"

function Shop() {
    const { backend_url } = useContext(shopContext)
    const { sellerData, getShopInfo, shopData, getEventsOfShop, shopEvents } = useContext(shopContext)
    const { shopId } = useParams()
    const {shopProducts, getProductsOfShop} = useContext(productContext)

    
    useEffect(() => {
        getProductsOfShop(shopId)
    }, [shopId])

    useEffect(()=>{
        getShopInfo(shopId)
    },[shopId])

    useEffect(()=>{
        getEventsOfShop(shopId)
    },[shopId])

    const owner =
    sellerData?._id &&
    shopData?._id &&
    sellerData._id === shopData._id

    

    return (
        <>
            <div className="flex bg-gray-100 pt-7">
                <ShopSideBar shopData={shopData} shopProducts={shopProducts} owner={owner}/>
                {shopProducts&&<ShopProfileData shopProducts={shopProducts} shopEvents={shopEvents} owner={owner}/>}
            </div>
        </>
    )
}


export default Shop