import { useContext, useEffect, useState } from "react"
// import { productData } from "../static/data"
import { Link, useNavigate, useParams } from "react-router-dom"
import { generalContext } from "../context/Context"
import { GoHeart, GoHeartFill } from 'react-icons/go'
import { AiFillMessage } from "react-icons/ai";
import { AiOutlineShoppingCart } from 'react-icons/ai'
import Product from "../components/product/ProductCard"
import { useSearchParams } from "react-router-dom";


function ProductFullDetails() {
    const navigate = useNavigate()
    const {userData} = useContext(userContext)
    const [activeImage, setActiveImage] = useState(0)
    const [data, setData] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const { id } = useParams()
    const { backend_url, allProducts } = useContext(productContext)
    const { addToCart } = useContext(cartContext)
    const { isInWishlist, addToWishlist, removeFromWishlist } = useContext(wishlistContext)
    const [searchParams] = useSearchParams()
    const isEvent = searchParams.get("isEvent")
    const { events } = useContext(generalContext)

    useEffect(() => {
        if (isEvent !== null) {
            const data = events && events.find((i) => i._id === id)
            setData(data)
            console.log("event data: ", data)
        } else {
            const data = allProducts && allProducts.find((i) => i._id === id)
            setData(data)
            console.log("product data: ", data)
        }

    }, [allProducts, id])

    async function handleSendMessage() {
        const userId = userData&&userData._id
        const sellerId = data&&data.shop._id
        try {
            const {data} = await axios.post(backend_url+'/api/conversation/create-new-conversation', 
                {userId, sellerId},
                {withCredentials: true}
            )
            if(data.success){
                navigate("/conversation/"+data.conversationData._id)
            }
        } catch (error) {
            
        }
    }
    return data && (
        <div>
            <div className="flex w-[80%] m-auto mt-5">
                <div className="w-[50%]">
                    <img
                        src={`${backend_url}/uploads/` + data?.images[activeImage]}
                        alt=""
                        className="w-80 h-80 object-contain"
                    />
                    <div className="flex">
                        {data.images.map((item, index) =>
                            <img
                                key={index}
                                onClick={() => setActiveImage(index)}
                                src={`${backend_url}/uploads/` + item}
                                alt=""
                                className={`w-50 cursor-pointer ${activeImage === index ? "border border-[#E5E7EB]" : ""}`}
                            />
                        )}
                    </div>
                </div>
                <div className="w-[50%]">
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
                            isInWishlist(data)
                                ? <GoHeartFill
                                    color='red'
                                    className='mb-2 cursor-pointer'
                                    size={25}
                                    onClick={(e) => {
                                        removeFromWishlist(data)
                                        e.preventDefault()
                                        e.stopPropagation()
                                    }} />
                                : <GoHeart
                                    className='mb-2 cursor-pointer'
                                    size={25}
                                    onClick={(e) => {
                                        addToWishlist(data)
                                        e.preventDefault()
                                        e.stopPropagation()
                                    }} />
                        }
                    </div>
                    <button
                        className="bg-black text-white flex items-center px-7 py-3 rounded-md mt-5 cursor-pointer"
                        onClick={() => addToCart(data, quantity)}
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
                                <p className="text-sm">({data.shop.ratings}) Ratings</p>
                            </div>
                        </div>
                        <button
                            className="text-white bg-[#6443D1] px-7 py-3 rounded-md flex items-center ml-7 cursor-pointer"
                            onClick={handleSendMessage}
                        >
                            Send Message
                            <AiFillMessage
                                size={20}
                                className="ml-1"
                            />
                        </button>
                    </div>
                </div>
            </div>
            <Details data={data} />
            <RelatedProducts data={data} />
        </div>
    )
}
export default ProductFullDetails



function Details({ data }) {
    const [toShow, setToShow] = useState("pro-details")
    const { backend_url } = useContext(productContext)
    const { shopProducts, getProductsOfShop } = useContext(productContext)
    useEffect(() => {
        getProductsOfShop(data.shop._id)
    }, [data])
    return (
        <div className="w-[80%] bg-[#F5F6FB] m-auto rounded-md mb-15">
            <div className="p-10">
                <div className="flex justify-between items-center">
                    <p className={`text-xl font-semibold cursor-pointer px-1 ${toShow === 'pro-details' ? 'border-b-3 border-[#DC143C]' : ""}`} onClick={() => setToShow("pro-details")}>Product Details</p>
                    <p className={`text-xl font-semibold cursor-pointer px-1 ${toShow === 'pro-reviews' ? 'border-b-3 border-[#DC143C]' : ""}`} onClick={() => setToShow("pro-reviews")}>Product Reviews</p>
                    <p className={`text-xl font-semibold cursor-pointer px-1 ${toShow === 'seller-info' ? 'border-b-3 border-[#DC143C]' : ""}`} onClick={() => setToShow("seller-info")}>Seller Information</p>
                </div>
                <hr className="text-[#E5E7EB] mt-1 mb-6" />
                {toShow === "pro-details"
                    ? <div className="flex flex-col gap-10 text-lg leading-8">
                        <p>{data.description}</p>
                    </div>
                    : toShow === 'pro-reviews'
                        ? <div className="h-50">
                            {data?.reviews?.length === 0
                                ? <div className="flex justify-center items-center flex-1">
                                    <p>No reviews yet!</p>
                                </div>
                                : <div>
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
                            ? <div className="flex justify-between">
                                <div className="w-[50%]">
                                    <div className="flex items-center mb-4">
                                        <Link to={`/shop/${data.shop._id}`} className="w-15 h-15 rounded-full overflow-hidden">
                                            <img src={`${backend_url}/uploads/` + data.shop.avator} alt="" className="w-full h-full object-cover" />
                                        </Link>
                                        <div className="ml-2">
                                            <Link to={`/shop/${data.shop._id}`} className="text-sm text-blue-500">{data.shop.name}</Link>
                                            <p className="text-sm">({data.shop.ratings}) Ratings</p>
                                        </div>
                                    </div>
                                    <p>
                                        {data.shop.description
                                            ? data.shop.description
                                            : "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit iste suscipit provident quo fugit, omnis maiores sunt voluptate commodi consequuntur aspernatur obcaecati impedit cum voluptatum itaque autem eius voluptas maxime facilis asperiores quae officia soluta sed vel."
                                        }
                                    </p>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <p className="font-semibold">Joined On: {data.shop.createdAt.split('T')[0]}</p>
                                    <p className="font-semibold">Total Products: {shopProducts?.length}</p>
                                    <p className="font-semibold">Total Reviews: --</p>
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



import { productContext } from "../context/ProductContext"
import { cartContext } from "../context/CartContext";
import { wishlistContext } from "../context/WishlistContext";
import Ratings from "../components/ratings/Ratings";
import { userContext } from "../context/UserContext";
import axios from "axios";
function RelatedProducts({ data }) {
    const [sameCat, setSameCat] = useState(null)
    const { allProducts } = useContext(productContext)
    useEffect(() => {
        const sameCatPro = allProducts.filter((i) => i.category === data.category)
        setSameCat(sameCatPro)
    }, [allProducts, data])
    return sameCat && (
        <div className="bg-[#F5F6FB] pb-17 pt-5">
            <div className="w-[90%] m-auto">
                <p className="text-3xl font-bold">Related Products</p>
                <hr className="text-[#E5E7EB] mt-8 mb-6" />
                <div className="grid grid-cols-4 gap-7">
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











































