import { useContext, useState } from 'react'
import {FaRegHeart } from 'react-icons/fa'
import { GoHeart, GoHeartFill } from 'react-icons/go'
import { FiEye } from 'react-icons/fi'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import ProductDetails from './ProductDetails'
import { Link } from 'react-router-dom'
import { generalContext } from '../../context/Context'
import { cartContext } from '../../context/CartContext'
import { wishlistContext } from '../../context/WishlistContext'
import Ratings from '../ratings/Ratings'

function Product({ item }) {
    const [imageError, setImageError] = useState(false)
    const [showProductDetails, setShowProductDetails] = useState(false)
    const { backend_url } = useContext(generalContext)
    const { addToCart } = useContext(cartContext)
    const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(wishlistContext)

    

    // const name = item.name.replaceAll(" ", '-')
    return item && (
        <div>
            <Link to={`/products/${item._id}`}>
                <div className='p-[12px] bg-white rounded-lg'>
                    <div className='flex justify-center'>
                        {!imageError && item?.images?.[0]
                            ? <img
                                src={`${backend_url}/uploads/` + item?.images[0]}
                                alt="prodcut-image"
                                className='w-full h-50 object-contain'
                            />
                            : (
                                <div className='w-full h-50 border border-black-500'> no image</div>
                            )
                        }
                        <div className='mt-2'>
                            {
                                isInWishlist(item)
                                    ? <GoHeartFill
                                        color='red'
                                        className='mb-2'
                                        size={20}
                                        onClick={(e)=>{
                                            removeFromWishlist(item)
                                            e.preventDefault()
                                            e.stopPropagation()
                                        }}
                                    />
                                    : <GoHeart
                                        className='mb-2'
                                        size={20}
                                        onClick={(e)=>{
                                            addToWishlist(item)
                                            e.preventDefault()
                                            e.stopPropagation()
                                        }}
                                    />
                            }

                            <FiEye
                                className='mb-2'
                                size={20}
                                onClick={(e) => {
                                    setShowProductDetails(true)
                                    e.preventDefault()
                                    e.stopPropagation()
                                }}

                            />
                            <AiOutlineShoppingCart
                                className='mb-2'
                                size={20}
                                onClick={(e) => {
                                    addToCart(item)
                                    e.preventDefault()
                                    e.stopPropagation()
                                }}
                            />
                        </div>
                    </div>


                    <p className='text-sm text-blue-400 my-2'>{item.shop.name}</p>
                    <p
                        className='font-semibold my-3 overflow-hidden'
                        style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical"
                        }}
                    >
                        {
                            item.name.length > 40 ? item.name.slice(0, 40) + "..." : item.name
                        }
                    </p>
                    <Ratings rating={item.ratings}/>
                    <div className='flex justify-between my-3 w-full'>
                        <div className='flex'>
                            <p className='font-bold text-lg'>${item.price}</p>
                            {item.originalPrice
                                ? <p className='text-red-500 line-through text-sm mb-2 ml-2'>${item.originalPrice}</p>
                                : ""
                            }
                        </div>
                        <p className='text-green-400 text-lg'>{item.soldOut} sold</p>
                    </div>
                </div>
            </Link>
            {showProductDetails && <ProductDetails key={item._id} item={item} setShowProductDetails={setShowProductDetails} addToWishlist={addToWishlist} handleAddToWishList={handleAddToWishList} />}
        </div>
    )
}

export default Product