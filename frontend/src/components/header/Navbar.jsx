import CategoryList from "./CategoryList"
import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import Cart from "../cart/Cart"
import Wishlist from "../wishlist/Wishlist"
import { useSelector } from "react-redux"
import { backend_url } from '../../server'

function Navbar({cart, openCart, setOpenCart, wishlist, openWishlist, setOpenWishlist, uLoggedIn, userData}) {
    const [showCategory, setShowCategory] = useState(false)
    
    

    const location = useLocation()
    function isActive(path) {
        return path === location.pathname
    }

    const navigate = useNavigate()

    return (
        <>
            <div className="flex items-center justify-between bg-[#332AC8] h-17 px-20">
                <button onClick={() => setShowCategory(!showCategory)} className="lg:block hidden bg-white h-15 mt-2 font-semibold rounded-t-lg px-3 text-lg cursor-pointer w-70">
                    <i className="fa-solid fa-book-open mr-3"></i>
                    All Categories
                    <i className="fa-solid fa-angle-down ml-18"></i>
                </button>
                <div className="flex gap-10">
                    <Link
                        to='/'
                        className={`font-semibold cursor-pointer ${isActive('/') ? "text-green-500" : "text-white"}`}
                    >Home
                    </Link>
                    <Link
                        to='/best-selling'
                        className={`font-semibold cursor-pointer ${isActive('/best-selling') ? "text-green-500" : "text-white"}`}
                    >Best Selling
                    </Link>
                    <Link
                        to='/products'
                        className={`font-semibold cursor-pointer ${isActive('/products') ? "text-green-500" : "text-white"}`}
                    >Products</Link>
                    <Link
                        to='/events'
                        className={`font-semibold cursor-pointer ${isActive('/events') ? "text-green-500" : "text-white"}`}
                    >Events
                    </Link>
                    <Link
                        to='/faq'
                        className={`font-semibold cursor-pointer ${isActive('/faq') ? "text-green-500" : "text-white"}`}
                    >FAQ
                    </Link>
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
                    <div className="relative inline-block cursor-pointer" onClick={() => navigate('/profile')}>
                        {uLoggedIn
                            ? <img
                                src={`${backend_url}/uploads/` + userData?.avator}
                                alt=""
                                className="w-10 h-10 object-cover rounded-full"
                            />
                            : <i className="fa-regular fa-circle-user"></i>
                        }
                    </div>
                </div>
            </div>
            {showCategory && <CategoryList setShowCategory={setShowCategory} />}
            {openCart && <Cart setOpenCart={setOpenCart} />}
            {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}
        </>
    )
}


export default Navbar