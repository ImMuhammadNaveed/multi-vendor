import { RxCross2 } from "react-icons/rx";
import { AiFillMessage } from "react-icons/ai";
import { GoHeart, GoHeartFill } from 'react-icons/go'
import { useState } from "react";
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { Link } from "react-router-dom";
import { addToCartAction } from '../../redux/actions/cart'
import { useDispatch, useSelector } from 'react-redux'
import { addToWishlistAction, isInWishlistAction, removeFromWishlistAction } from "../../redux/actions/wishlist";
import { sendMessageAction } from "../../redux/actions/user";
import { getShopProductsAction } from "../../redux/actions/product";
import { backend_url } from "../../server";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ProductDetails({ item, setShowProductDetails, addToWishlist }) {
    const [quantity, setQuantity] = useState(1)
    const userData = useSelector(state => state.user.user)
    const wishlist = useSelector(state => state.wishlist.wishlist)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (!item) return
        dispatch(getShopProductsAction(item.shop._id))
    }, [item, dispatch])
    const shopProducts = useSelector(state => state.product.shopProducts)

    const totalNumberOfReviews = shopProducts && shopProducts.reduce((acc, p) => acc + p.reviews.length, 0)
    const totalRatings = shopProducts && shopProducts.reduce((acc, p) => acc + p.reviews.reduce((sum, r) => sum + r.rating, 0), 0)
    const shopRating = totalNumberOfReviews / totalRatings

    return item && (
        <>
            <div className="inset-0 bg-black/40 fixed z-50 flex justify-center items-center">
                <div className="lg:w-[60%] w-[90%] h-[75vh] bg-white overflow-y-scroll p-4 rounded-md">
                    <div className="flex justify-end">
                        <RxCross2 size={25}
                            onClick={() => setShowProductDetails(false)}
                            className="cursor-pointer"
                        />
                    </div>

                    <div className="flex lg:flex-row flex-col gap-4">
                        <div className="lg:w-[50%] w-full">
                            <img
                                src={`${backend_url}/uploads/` + item?.images[0]}
                                alt=""
                                className=""
                            />
                            <div className="flex items-center my-6">
                                <Link to={`/shop/${item.shop._id}`} className="h-12 w-12 overflow-hidden rounded-full">
                                    <img src={`${backend_url}/uploads/` + item.shop.avator} alt="" className="w-full h-full object-cover" />
                                </Link>
                                <div className="ml-2">
                                    <Link to={`/shop/${item.shop._id}`} className="text-sm text-blue-500">{item.shop.name}</Link>
                                    <p className="text-sm">({shopRating}) Ratings</p>
                                </div>
                            </div>
                            <button
                                onClick={() => dispatch(sendMessageAction(userData, item, navigate))}
                                className="text-white bg-black px-7 py-3 rounded-md flex items-center mt-5 cursor-pointer"
                            >Send Message
                                <AiFillMessage
                                    size={20}
                                    className="ml-1"
                                />
                            </button>
                            <p className="text-red-500 mt-10">({item.soldOut}) Sold out</p>
                        </div>
                        <div className="lg:w-[50%] w-full">
                            <p className="text-2xl font-bold mb-3">{item.name}</p>
                            <p>{item.description}</p>
                            <div className="flex my-4">
                                <p className="text-lg font-bold">${item.price}</p>
                                {
                                    item.originalPrice
                                        ? <p className="text-red-500 line-through ml-3 mb-2 text-sm">${item.originalPrice}</p>
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
                                    isInWishlistAction(wishlist, item._id)
                                        ? <GoHeartFill color='red' className='mb-2 cursor-pointer' size={25} onClick={() => dispatch(removeFromWishlistAction(item, userData))} />
                                        : <GoHeart className='mb-2 cursor-pointer' size={25} onClick={() => dispatch(addToWishlistAction(item, userData))} />
                                }
                            </div>
                            <button
                                className="bg-black text-white flex items-center px-7 py-3 rounded-md mt-5 cursor-pointer"
                                onClick={() => dispatch(addToCartAction(item, userData, quantity))}
                            >Add to cart
                                <AiOutlineShoppingCart
                                    className='ml-1'
                                    size={20}
                                />
                            </button>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}


export default ProductDetails