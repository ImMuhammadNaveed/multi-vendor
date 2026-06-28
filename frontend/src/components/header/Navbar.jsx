import CategoryList from "./CategoryList"
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Cart from "../cart/Cart"
import Wishlist from "../wishlist/Wishlist"
import { userContext } from "../../context/UserContext"
import {cartContext} from '../../context/CartContext'
import { wishlistContext } from "../../context/WishlistContext"
import { shopContext } from "../../context/ShopContext"

function Navbar() {
    const [showCategory, setShowCategory] = useState(false)
    const [openCart, setOpenCart] = useState(false)
    const [openWishlist, setOpenWishlist] = useState(false)
    const { userData, backend_url, uLoggedIn } = useContext(userContext)
    const {cart} = useContext(cartContext) 
    const {wishlist} = useContext(wishlistContext)
    

    const navigate = useNavigate()

    return (
        <>
            <div className="flex items-center justify-between bg-[#332AC8] h-17 px-20">
                <button onClick={() => setShowCategory(!showCategory)} className="bg-white h-15 mt-2 font-semibold rounded-t-lg px-3 text-lg cursor-pointer w-70">
                    <i className="fa-solid fa-book-open mr-3"></i>
                    All Categories
                    <i className="fa-solid fa-angle-down ml-18"></i>
                </button>
                <div className="flex gap-10">
                    <Link to='/' className="font-semibold text-white cursor-pointer">Home</Link>
                    <Link to='/best-selling' className="font-semibold text-white cursor-pointer">Best Selling</Link>
                    <Link to='/products' className="font-semibold text-white cursor-pointer">Products</Link>
                    <Link to='/events' className="font-semibold text-white cursor-pointer">Events</Link>
                    <Link to='/faq' className="font-semibold text-white cursor-pointer">FAQ</Link>
                </div>
                <div className="flex items-center text-white text-2xl gap-5">
                    <div className="relative inline-block cursor-pointer">
                        <i className="fa-regular fa-heart" onClick={() => { setOpenWishlist(true) }}></i>
                        <span className="absolute -top-0 -right-0 
                            bg-green-500 text-white 
                            text-xs font-bold 
                            w-4 h-4 
                            flex items-center justify-center 
                            rounded-full">
                            {wishlist.length}
                        </span>
                    </div>

                    <div className="relative inline-block cursor-pointer">
                        <i className="fa-solid fa-cart-shopping" onClick={() => { setOpenCart(true) }}></i>
                        <span className="absolute -top-0 -right-0 
                            bg-green-500 text-white 
                            text-xs font-bold 
                            w-4 h-4 
                            flex items-center justify-center 
                            rounded-full">
                            {cart.length}
                        </span>
                    </div>
                    <div className="relative inline-block cursor-pointer">
                        {uLoggedIn
                            ? <img
                                src={`${backend_url}/uploads/` + userData?.avator}
                                alt=""
                                className="w-10 h-10 object-cover rounded-full"
                                onClick={() => navigate('/profile')}
                            />
                            : <i
                                className="fa-regular fa-circle-user"
                                onClick={() => navigate('/login')}>
                            </i>
                        }
                    </div>
                </div>
            </div>
            {showCategory && <CategoryList />}
            {openCart && <Cart setOpenCart={setOpenCart} />}
            {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}
        </>
    )
}


export default Navbar