import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import cart_pic from '../../static/cart-item.png'
import { GoHeart } from 'react-icons/go'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { wishlistContext } from '../../context/WishlistContext'

function Wishlist({ setOpenWishlist }) {
    // const data = [
    //     {
    //         image: cart_pic,
    //         name: "Iphone 14 pro max 256 gb ssd and 8 gb ram silver colour",
    //         price: 699
    //     },
    //     {
    //         image: cart_pic,
    //         name: "Iphone 14 pro max 256 gb ssd and 8 gb ram silver colour",
    //         price: 999
    //     },
    //     {
    //         image: cart_pic,
    //         name: "Iphone 14 pro max 256 gb ssd and 8 gb ram silver colour",
    //         price: 245
    //     }
    // ]
    const { wishlist } = useContext(wishlistContext)

    return (
        <div className="fixed inset-0 bg-black/40 z-60">
            <div className="fixed z-51 w-[25%] bg-white top-0 right-0 h-screen overflow-y-scroll">
                <div className="flex justify-end mr-3 mt-3">
                    <RxCross1
                        onClick={() => { setOpenWishlist(false) }}
                        size={25}
                        className="cursor-pointer font-bold "
                    />
                </div>

                <p className="flex text-xl font-semibold items-center my-8 ml-3">
                    <GoHeart size={25} className="mr-2" />{wishlist.length} items
                </p>
                <hr className="text-[#E5E7EB]" />
                {
                    wishlist.map((item) =>
                        <WishlistItem item={item} />
                    )
                }
            </div>
        </div>

    )
}
export default Wishlist





import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { useContext, useState } from "react";
import { generalContext } from '../../context/Context'
import {cartContext} from '../../context/CartContext'

function WishlistItem({ item }) {
    const { backend_url } = useContext(generalContext)
    const { removeFromWishlist } = useContext(wishlistContext)
    const {addToCart} = useContext(cartContext)
    return (
        <div>
            <div className="flex items-center pt-3 pl-3 pb-3">
                <RxCross1
                    size={30}
                    className="cursor-pointer"
                    onClick={() => removeFromWishlist(item.product)}
                />
                <div>
                    <img src={`${backend_url}/uploads/` + item.product.images[0]} className="w-70 object-contain" alt="" />
                </div>
                <div>
                    <p className="text-sm">{item.product.name}</p>
                    <p className="font-bold text-[#D02222] mt-1">US${item.product.price}</p>
                </div>
                <AiOutlineShoppingCart
                    size={50}
                    className="cursor-pointer"
                    onClick={()=>addToCart(item.product)}
                />
            </div>
            <hr className="text-[#E5E7EB]" />
        </div>

    )
}
