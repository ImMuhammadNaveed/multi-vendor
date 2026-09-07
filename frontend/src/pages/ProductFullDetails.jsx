import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { GoHeart, GoHeartFill } from 'react-icons/go'
import { AiFillMessage } from "react-icons/ai";
import { AiOutlineShoppingCart } from 'react-icons/ai'
import Product from "../components/product/ProductCard"
import { useSearchParams } from "react-router-dom";
import { addToWishlist, isInWishlist, removeFromWishlist } from "../redux/slices/wishlist";
import { sendMessage } from "../redux/thunks/user";
import { addToCart } from "../redux/slices/cart";
import { useDispatch, useSelector } from "react-redux";
import { backend_url } from "../server";
import ProductDetailsAnimation from "../assets/ProductDetailsAnimation";
import ProductCardAnimation from "../assets/ProductCardAnimation";
import LoadingButton from "../components/loading/LoadingButton";


function ProductFullDetails() {
    const navigate = useNavigate()
    const userData = useSelector(state=> state.user.user)
    const [activeImage, setActiveImage] = useState(0)
    const [data, setData] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [sendingMessage, setSendingMessage] = useState(false)
    const { id } = useParams()
    const allProducts = useSelector(state=> state.product.allProducts)
    const allProductsLoading = useSelector(state => state.product.allProductsLoading)
    const wishlist = useSelector(state=> state.wishlist.wishlist)
    const dispatch = useDispatch()
    
    const [searchParams] = useSearchParams()
    const isEvent = searchParams.get("isEvent")
    const events = useSelector(state=> state.event.allEvents)
    const allEventsLoading = useSelector(state => state.event.allEventsLoading)
    useEffect(() => {
        if (isEvent !== null) {
            const data = events && events.find((i) => i._id === id)
            console.log("event details:", data)
            setData(data)
        } else {
            const data = allProducts && allProducts.find((i) => i._id === id)
            setData(data)
        }
    }, [allProducts, events, id, isEvent])

    useEffect(() => {
        if(!data) return
        dispatch(getShopProducts(data.shop._id))
    }, [data, dispatch])
    const shopProducts = useSelector(state=> state.product.shopProducts)

    const totalNumberOfReviews = shopProducts ? shopProducts.reduce((acc, p)=> acc+p.reviews.length, 0) : 0
    const totalRatings = shopProducts ? shopProducts.reduce((acc, p)=> acc+p.reviews.reduce((sum, r)=>sum+r.rating, 0), 0) : 0
    const shopRating = totalNumberOfReviews ? (totalRatings/totalNumberOfReviews).toFixed(1) : 0

    async function handleSendMessage() {
        try {
            setSendingMessage(true)
            await dispatch(sendMessage({userData:userData, data:data, navigate: navigate}))
        } finally {
            setSendingMessage(false)
        }
    }
    const isWishlist = isInWishlist(data, wishlist)
    const detailsLoading = isEvent ? allEventsLoading : allProductsLoading

    if (detailsLoading || data === null) {
        return <ProductDetailsAnimation />
    }

    if (!data) {
        return (
            <div className="flex min-h-60 items-center justify-center">
                <p className="text-lg font-semibold">Product not found!</p>
            </div>
        )
    }

    return (
        <div>
            <div className="flex flex-col lg:flex-row lg:w-[80%] w-[92%] m-auto mt-5">
                <div className="w-full lg:w-[50%]">
                    <div className="flex justify-center lg:justify-start">
                        <img
                        src={`${backend_url}/uploads/` + data?.images[activeImage]}
                        alt=""
                        className="w-80 h-80 object-contain"
                    />
                    </div>
                    <div className="flex justify-center lg:justify-start my-4">
                        {data.images.map((item, index) =>
                            <img
                                key={index}
                                onClick={() => setActiveImage(index)}
                                src={`${backend_url}/uploads/` + item}
                                alt=""
                                className={`w-40 p-4 cursor-pointer ${activeImage === index ? "border border-[#E5E7EB]" : ""}`}
                            />
                        )}
                    </div>
                </div>
                <div className="w-full lg:w-[50%]">
                    <p className="text-2xl text-[#333333] font-bold mb-1">{data.name}</p>
                    <p>{data.description}</p>
                    <div className="flex mt-5">
                        <p className="text-lg font-bold">${data.price}</p>
                        {
                            data.price
                                ? <p className="text-red-500 line-through ml-3 mb-2 text-sm">${data.originalPrice}</p>
                                : ""
                        }
                    </div>
                    <div className="flex items-center justify-between mt-10">
                        <div className="flex">
                            <button
                                onClick={() => { quantity > 1 ? setQuantity(quantity - 1) : quantity }}
                                className="bg-[#5BD7C8] px-3 py-1 rounded-l-md text-white cursor-pointer"
                            >-</button>
                            <p className="bg-[#E5E7EB] px-3 py-1">{quantity}</p>
                            <button
                                onClick={() => { setQuantity(quantity + 1) }}
                                className="bg-[#5BD7C8] px-3 py-1 rounded-r-md text-white cursor-pointer"
                            >+</button>
                        </div>

                        {
                            isWishlist
                                ? <GoHeartFill
                                    color='red'
                                    className='mb-2 cursor-pointer'
                                    size={25}
                                    onClick={(e) => {
                                        dispatch(removeFromWishlist(data))
                                        e.preventDefault()
                                        e.stopPropagation()
                                    }} />
                                : <GoHeart
                                    className='mb-2 cursor-pointer'
                                    size={25}
                                    onClick={(e) => {
                                        dispatch(addToWishlist(data))
                                        e.preventDefault()
                                        e.stopPropagation()
                                    }} />
                        }
                    </div>
                    <button
                        className="bg-black text-white flex items-center px-7 py-3 rounded-md mt-5 cursor-pointer"
                        onClick={() => dispatch(addToCart(data, quantity))}
                    >Add to cart
                        <AiOutlineShoppingCart
                            className='ml-1'
                            size={20}
                        />
                    </button>
                    <div className="flex items-center my-10">
                        <div className="flex items-center">
                            <Link to={`/shop/${data.shop._id}`} className="w-12 h-12 rounded-full overflow-hidden">
                                <img src={`${backend_url}/uploads/` + data.shop.avator} alt="" className="w-full h-full object-cover" />
                            </Link>
                            <div className="ml-2">
                                <Link to={`/shop/${data.shop._id}`} className="text-sm text-blue-500">{data.shop.name}</Link>
                                <p className="text-sm">({shopRating}) Ratings</p>
                            </div>
                        </div>
                        <LoadingButton
                            loading={sendingMessage}
                            className="text-white bg-[#6443D1] px-7 py-3 rounded-md flex items-center ml-7 cursor-pointer"
                            onClick={handleSendMessage}
                        >
                            Send Message
                            <AiFillMessage
                                size={20}
                                className="ml-1"
                            />
                        </LoadingButton>
                    </div>
                </div>
            </div>
            <Details data={data} shopProducts={shopProducts} shopRating={shopRating} totalNumberOfReviews={totalNumberOfReviews} />
            <RelatedProducts data={data} />
        </div>
    )
}
export default ProductFullDetails



function Details({ data, shopRating, shopProducts, totalNumberOfReviews}) {
    const [toShow, setToShow] = useState("pro-details")
    
    return data&&(
        <div className="lg:w-[80%] w-[92%] bg-[#F5F6FB] m-auto rounded-md mb-15">
            <div className="lg:p-10 px-4 py-10">
                <div className="flex justify-between items-center">
                    <p className={`text-xl font-semibold cursor-pointer px-1 ${toShow === 'pro-details' ? 'border-b-3 border-[#DC143C]' : ""}`} onClick={() => setToShow("pro-details")}>Product Details</p>
                    <p className={`text-xl font-semibold cursor-pointer px-1 ${toShow === 'pro-reviews' ? 'border-b-3 border-[#DC143C]' : ""}`} onClick={() => setToShow("pro-reviews")}>Product Reviews</p>
                    <p className={`text-xl font-semibold cursor-pointer px-1 ${toShow === 'seller-info' ? 'border-b-3 border-[#DC143C]' : ""}`} onClick={() => setToShow("seller-info")}>Seller Information</p>
                </div>
                <hr className="text-[#E5E7EB] mt-1 mb-6" />
                {toShow === "pro-details"
                    ? <div className="flex flex-col gap-10 text-lg leading-8 h-50 overflow-y-scroll scrollbar-hide">
                        <p>{data.description}</p>
                    </div>
                    : toShow === 'pro-reviews'
                        ? <div className="h-50">
                            {data?.reviews?.length === 0 || !data.reviews
                                ? <div className="flex justify-center items-center flex-1">
                                    <p>No reviews yet!</p>
                                </div>
                                : <div className="h-50 overflow-y-scroll scrollbar-hide">
                                    {
                                        data.reviews.map((rev) => (
                                            <div className="flex items-center">
                                                <img
                                                    src={`${backend_url}/uploads/` + rev.user.avator}
                                                    alt=""
                                                    className="w-14 h-14 object-cover rounded-full"
                                                />
                                                <div className="ml-2">
                                                    <div className="flex items-center gap-2">
                                                        <p className="font-[600]">{rev.user.name}</p>
                                                        <Ratings rating={rev.rating} />
                                                    </div>
                                                    <p>{rev.comment}</p>
                                                </div>
                                            </div>
                                        ))
                                    }


                                </div>
                            }

                        </div>
                        : toShow === 'seller-info'
                            ? <div className="flex lg:flex-row flex-col lg:justify-between lg:gap-0 gap-4 h-50 overflow-y-scroll scrollbar-hide">
                                <div className="lg:w-[50%] w-full">
                                    <div className="flex items-center mb-4">
                                        <Link to={`/shop/${data.shop._id}`} className="w-15 h-15 rounded-full overflow-hidden">
                                            <img src={`${backend_url}/uploads/` + data.shop.avator} alt="" className="w-full h-full object-cover" />
                                        </Link>
                                        <div className="ml-2">
                                            <Link to={`/shop/${data.shop._id}`} className="text-sm text-blue-500">{data.shop.name}</Link>
                                            <p className="text-sm">({shopRating}) Ratings</p>
                                        </div>
                                    </div>
                                    <p>
                                        {data&&data.shop.description
                                            ? data.shop.description
                                            : "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit iste suscipit provident quo fugit, omnis maiores sunt voluptate commodi consequuntur aspernatur obcaecati impedit cum voluptatum itaque autem eius voluptas maxime facilis asperiores quae officia soluta sed vel."
                                        }
                                    </p>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <p className="font-semibold">Joined On: {data.shop.createdAt.split('T')[0]}</p>
                                    <p className="font-semibold">Total Products: {shopProducts?.length}</p>
                                    <p className="font-semibold">Total Reviews: {totalNumberOfReviews}</p>
                                    <Link
                                        to={`/shop/${data.shop._id}`}
                                        className="bg-black text-white w-38 py-2 rounded-md cursor-pointer flex justify-center">Visit Shop</Link>
                                </div>
                            </div>
                            : ""
                }
            </div>
        </div>
    )
}




import Ratings from "../components/ratings/Ratings";
import { getShopProducts } from "../redux/thunks/product";
function RelatedProducts({ data }) {
    const allProducts = useSelector(state=> state.product.allProducts)
    const allProductsLoading = useSelector(state => state.product.allProductsLoading)
    const sameCat = allProducts.filter((item) => item.category === data.category)
    if (allProductsLoading || sameCat === null) {
        return (
            <div className="bg-[#F5F6FB] pb-17 pt-5">
                <div className="w-[90%] m-auto">
                    <p className="text-3xl font-bold">Related Products</p>
                    <hr className="text-[#E5E7EB] mt-8 mb-6" />
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-7 mx-auto">
                        <ProductCardAnimation />
                        <ProductCardAnimation />
                        <ProductCardAnimation />
                        <ProductCardAnimation />
                    </div>
                </div>
            </div>
        )
    }

    return sameCat && (
        <div className="bg-[#F5F6FB] pb-17 pt-5">
            <div className="w-[90%] m-auto">
                <p className="text-3xl font-bold">Related Products</p>
                <hr className="text-[#E5E7EB] mt-8 mb-6" />
                <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-7 mx-auto">
                    {
                        sameCat.map((item) =>
                            <Product key={item._id} item={item} />
                        )
                    }
                </div>
            </div>
        </div>
    )
}











































