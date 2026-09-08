import ShopProfileData from "../components/shop/ShopProfileData"
import ShopSideBar from "../components/shop/ShopSideBar"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { getShopProducts } from "../redux/thunks/product"
import { useDispatch, useSelector } from "react-redux"
import { getShop } from "../redux/thunks/shop"
import { getShopEvents } from '../redux/thunks/event'
import ShopPageAnimation from '../assets/ShopPageAnimation'

function Shop() {
    const { shopId } = useParams()
    const dispatch = useDispatch()

    // Get data from Redux
    const sellerData = useSelector(state => state.shop.seller)

    const shopProducts = useSelector(
        state => state.product.shopProducts
    )

    const shopData = useSelector(
        state => state.shop.shop
    )

    const shopEvents = useSelector(
        state => state.event.shopEvents
    )
    const shopLoading = useSelector(state => state.shop.shopLoading)
    const shopProductsLoading = useSelector(state => state.product.shopProductsLoading)
    const shopEventsLoading = useSelector(state => state.event.shopEventsLoading)

    // Calculate rating
    const totalNumberOfReviews = shopProducts?.reduce(
        (acc, product) => acc + product.reviews.length,
        0
    )

    const totalRatings = shopProducts?.reduce(
        (acc, product) =>
            acc + product.reviews.reduce(
                (sum, review) => sum + review.rating,
                0
            ),
        0
    )

    const shopRating =
        totalNumberOfReviews > 0
            ? totalRatings / totalNumberOfReviews
            : 0

    // Fetch shop products
    useEffect(() => {
        console.log("fetch shop products")
        dispatch(getShopProducts(shopId))
    }, [dispatch, shopId])

    // Fetch shop data
    useEffect(() => {
        dispatch(getShop(shopId))
    }, [dispatch, shopId])

    // Fetch shop events
    useEffect(() => {
        dispatch(getShopEvents(shopId))
    }, [dispatch, shopId])

    const owner =
        sellerData?._id &&
        shopData?._id &&
        sellerData._id === shopData._id

    if (shopLoading || shopProductsLoading || shopEventsLoading || !shopData?._id) {
        return <ShopPageAnimation />
    }

    return (
        <div className="h-screen overflow-hidden flex lg:flex-row flex-col bg-gray-100 py-4 px-4">
            <ShopSideBar
                shopData={shopData}
                shopProducts={shopProducts}
                owner={owner}
                shopRating={shopRating}
            />

            {shopProducts && (
                <ShopProfileData
                    shopProducts={shopProducts}
                    shopEvents={shopEvents}
                    owner={owner}
                />
            )}
        </div>
    )
}

export default Shop
