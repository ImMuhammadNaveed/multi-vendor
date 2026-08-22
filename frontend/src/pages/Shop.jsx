import axios from "axios"
import ShopProfileData from "../components/shop/ShopProfileData"
import ShopSideBar from "../components/shop/ShopSideBar"
import { useEffect, useState } from "react"
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

    const totalNumberOfReviews = shopProducts&&shopProducts.reduce((acc, p)=> acc+p.reviews.length, 0)
    const totalRatings = shopProducts&&shopProducts.reduce((acc, p)=> acc+p.reviews.reduce((sum, r)=>sum+r.rating, 0), 0)
    const shopRating = totalNumberOfReviews/totalRatings
    
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
            <div className="flex lg:flex-row flex-col bg-gray-100 py-7 px-4 h-full">
                <ShopSideBar shopData={shopData} shopProducts={shopProducts} owner={owner} shopRating={shopRating}/>
                {shopProducts&&<ShopProfileData shopProducts={shopProducts} shopEvents={shopEvents} owner={owner}/>}
            </div>
        </>
    )
}


export default Shop