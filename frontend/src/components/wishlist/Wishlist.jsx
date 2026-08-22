import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import cart_pic from '../../static/cart-item.png'
import { GoHeart } from 'react-icons/go'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { addToCartAction } from "../../redux/actions/cart";

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
    const wishlist = useSelector(state=> state.wishlist.wishlist)

    return (
        <div className="fixed inset-0 bg-black/40 z-60">
            <div className="fixed z-51 lg:w-[25%] w-[70%] bg-white top-0 right-0 h-screen overflow-y-scroll">
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
                        <WishlistItem item={item} key={item.product._id}/>
                    )
                }
            </div>
        </div>

    )
}
export default Wishlist





import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { useState } from "react";
import { useSelector } from "react-redux";
import { removeFromWishlistAction } from "../../redux/actions/wishlist";
import { useDispatch } from "react-redux";
import { backend_url } from "../../server";

function WishlistItem({ item }) {
    const dispatch = useDispatch()
    const userData = useSelector(state=> state.user.user)
    return (
        <div>
            <div className="flex lg:flex-row flex-col items-center pt-3 pl-3 pb-3">
                <RxCross1
                    // size={30}
                    className="cursor-pointer text-2xl lg:text-4xl"
                    onClick={() => dispatch(removeFromWishlistAction(item.product))}
                />
                <div>
                    <img src={`${backend_url}/uploads/` + item.product.images[0]} className="lg:w-70 w-40 p-2 object-contain" alt="" />
                </div>
                <div className="lg:w-100 w-full">
                    <p className="text-sm">{item.product.name}</p>
                    <p className="font-bold text-[#D02222] mt-1">US${item.product.price}</p>
                </div>
                <AiOutlineShoppingCart
                    // size={50}
                    className="cursor-pointer text-2xl lg:text-4xl"
                    onClick={()=>dispatch(addToCartAction(item.product, userData))}
                />
            </div>
            <hr className="text-[#E5E7EB]" />
        </div>

    )
}
