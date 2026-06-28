import { RxCross2 } from "react-icons/rx";
import { AiFillMessage } from "react-icons/ai";
import { GoHeart, GoHeartFill } from 'react-icons/go'
import { useState } from "react";
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { useContext } from "react";
import { productContext } from "../../context/ProductContext";
import { Link } from "react-router-dom";
import { cartContext } from "../../context/CartContext";

function ProductDetails({ item, setShowProductDetails, addToWishlist, handleAddToWishList }) {
    const [quantity, setQuantity] = useState(1)
    const { backend_url } = useContext(productContext)
    const { addToCart } = useContext(cartContext)

    return item && (
        <>
            <div className="inset-0 bg-black/40 fixed z-50 flex justify-center items-center">
                <div className="w-[60%] h-[75vh] bg-white overflow-y-scroll p-4 rounded-md">
                    <div className="flex justify-end">
                        <RxCross2 size={25}
                            onClick={() => setShowProductDetails(false)}
                            className="cursor-pointer"
                        />
                    </div>

                    <div className="flex gap-4">
                        <div className="w-[50%]">
                            <img
                                src={`${backend_url}/uploads/` + item?.images[0]}
                                alt=""
                                className=""
                            />
                            <div className="flex items-center mt-4">
                                <Link to={`/shop/${item.shop._id}`} className="h-12 w-12 overflow-hidden rounded-full">
                                    <img src={`${backend_url}/uploads/` + item.shop.avator} alt="" className="w-full h-full object-cover" />
                                </Link>
                                <div className="ml-2">
                                    <Link to={`/shop/${item.shop._id}`} className="text-sm text-blue-500">{item.shop.name}</Link>
                                    <p className="text-sm">({item.shop?.ratings}) Ratings</p>
                                </div>
                            </div>
                            <button className="text-white bg-black px-7 py-3 rounded-md flex items-center mt-5">Send Message <AiFillMessage size={20} className="ml-1" /></button>
                            <p className="text-red-500 mt-10">({item.soldOut}) Sold out</p>
                        </div>
                        <div className="w-[50%]">
                            <p className="text-2xl font-bold mb-3">{item.name}</p>
                            <p>{item.description}</p>
                            <div className="flex">
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
                                    addToWishlist
                                        ? <GoHeartFill color='red' className='mb-2' size={25} onClick={handleAddToWishList} />
                                        : <GoHeart className='mb-2' size={25} onClick={handleAddToWishList} />
                                }
                            </div>
                            <button
                                className="bg-black text-white flex items-center px-7 py-3 rounded-md mt-5 cursor-pointer"
                                onClick={() => addToCart(item)}
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