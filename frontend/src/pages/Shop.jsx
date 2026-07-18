import axios from "axios"
import ShopProfileData from "../components/shop/ShopProfileData"
import ShopSideBar from "../components/shop/ShopSideBar"
import { useContext, useEffect, useState } from "react"
import { shopContext } from "../context/ShopContext"
import { useParams } from "react-router-dom"
import { getShopProductsAction } from "../redux/actions/product"
import { useDispatch, useSelector } from "react-redux"
import { backend_url } from "../server"
import { getEventsAction, getShopAction } from "../redux/actions/shop"

function Shop() {
    const { shopId } = useParams()
    const dispatch = useDispatch()
    const shopProducts = useSelector(state=> state.product.shopProducts)
    const sellerData = useSelector(state=> state.shop.seller)
    const shopData = useSelector(state=> state.shop.shop)
    const shopEvents = useSelector(state=> state.shop.events)
    
    useEffect(() => {
        dispatch(getShopProductsAction(shopId))
    }, [shopId])

    useEffect(()=>{
        dispatch(getShopAction(shopId))
    },[shopId])

    useEffect(()=>{
        dispatch(getEventsAction(shopId))
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