import {useContext, useState } from 'react'
import {FaRegHeart } from 'react-icons/fa'
import { GoHeart, GoHeartFill } from 'react-icons/go'
import { FiEye } from 'react-icons/fi'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import ProductDetails from './ProductDetails'
import { Link } from 'react-router-dom'
import { generalContext } from '../../context/Context'
import { cartContext } from '../../context/CartContext'
// import { wishlistContext } from '../../context/WishlistContext'
import {userContext} from '../../context/UserContext'
import Ratings from '../ratings/Ratings'
import {useDispatch, useSelector} from 'react-redux'
import {isInWishlistAction, addToWishlistAction} from '../../redux/actions/wishlist'
import { addToCartAction } from '../../redux/actions/cart'
import { backend_url } from '../../server'

function Product({ item }) {
    const [imageError, setImageError] = useState(false)
    const [showProductDetails, setShowProductDetails] = useState(false)
    const userData = useSelector(state=>state.user.user)
    const dispatch = useDispatch()
    const wishlist = useSelector(state=> state.wishlist.wishlist)
    // const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(wishlistContext)
    

    

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
                                // isInWishlist(item)
                                isInWishlistAction(wishlist, item._id)
                                    ? <GoHeartFill
                                        color='red'
                                        className='mb-2'
                                        size={20}
                                        onClick={(e)=>{
                                            e.preventDefault()
                                            e.stopPropagation()
                                            removeFromWishlist(item)
                                        }}
                                    />
                                    : <GoHeart
                                        className='mb-2'
                                        size={20}
                                        onClick={(e)=>{
                                            // addToWishlist(item)
                                            e.preventDefault()
                                            e.stopPropagation()
                                            dispatch(addToWishlistAction(item, userData))
                                        }}
                                    />
                            }

                            <FiEye
                                className='mb-2'
                                size={20}
                                onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    setShowProductDetails(true)
                                }}

                            />
                            <AiOutlineShoppingCart
                                className='mb-2'
                                size={20}
                                onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    dispatch(addToCartAction(item, userData))
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
            {showProductDetails && <ProductDetails key={item._id} item={item} setShowProductDetails={setShowProductDetails} addToWishlist={addToWishlistAction}/>}
        </div>
    )
}

export default Product