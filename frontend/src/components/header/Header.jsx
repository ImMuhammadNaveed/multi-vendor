import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../../static/logo.svg'
import Navbar from './Navbar'
import { BiMenuAltLeft } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";
import Wishlist from '../wishlist/Wishlist';
import Cart from '../cart/Cart';


import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getImageUrl } from '../../utils/image'

function Header() {
    const [searchTerm, setSearchTerm] = useState("")
    const [searchData, setSearchData] = useState([])
    const sellerLogin = useSelector(state => state.shop.sellerLogin)
    const allProducts = useSelector(state => state.product.allProducts)
    const cart = useSelector(state => state.cart.cart)
    const [openCart, setOpenCart] = useState(false)
    const wishlist = useSelector(state => state.wishlist.wishlist)
    const [openWishlist, setOpenWishlist] = useState(false)
    const [openMobileMenu, setOpenMobileMenu] = useState(false)
    const userData = useSelector(state => state.user.user)
    const uLoggedIn = useSelector(state => state.user.userLogin)
    const navigate = useNavigate()


    useEffect(() => {
        if (searchTerm === "") {
            setSearchData([])
            return
        }
        const toShow = allProducts && allProducts.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
        setSearchData(toShow)
    }, [searchTerm, allProducts])

    const location = useLocation()
    useEffect(()=>{
        setOpenMobileMenu(false)
    },[location.pathname])
    return (
        <>
            <div className='bg-white sticky md:static top-0 z-50'>
                <div className=' flex items-center justify-between w-[90%] m-auto py-5'>
                    <BiMenuAltLeft className='block md:hidden cursor-pointer' size={40} onClick={() => setOpenMobileMenu(true)} />
                    <Link to='/'>
                        <img src={logo} className='' alt="" />
                    </Link>

                    <div className='relative hidden md:block'>
                        <div className='border-2 border-[#3957DB] rounded-md text-lg'>
                            <input
                                type="text"
                                placeholder='Search Product...'
                                className='md:w-80 lg:w-130 px-2 py-1 focus:outline-none'
                                onChange={(e) => setSearchTerm(e.target.value)}
                                value={searchTerm}
                            />
                            <i className="fa-solid fa-magnifying-glass mr-2"></i>
                        </div>
                        <div className='flex flex-col gap-4 absolute bg-white z-50 py-8'>
                            {
                                searchData.map((product, index) => (
                                    <Link
                                        className='flex items-center px-8 gap-2'
                                        to={`/products/${product._id}`}
                                        onClick={() => {
                                            setSearchTerm("")
                                            setSearchData([])
                                        }}
                                    >
                                        <img
                                            src={getImageUrl(product.images[0])}
                                            alt=""
                                            className='w-10'
                                        />
                                        <p>{product.name}</p>
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                    <Link
                        to={sellerLogin ? "/shop-dashboard" : "/create-shop"}
                        className='hidden md:block  bg-black text-white px-4 py-3 rounded-lg font-semibold cursor-pointer'
                    >
                        {sellerLogin ? "Go To DashBoard" : "Become Seller"}
                        <i
                            className="fa-solid fa-angle-right">
                        </i>
                    </Link>
                    <div className="block md:hidden relative inline-block cursor-pointer">
                        <i className="fa-solid fa-cart-shopping text-3xl" onClick={() => { setOpenCart(true) }}></i>
                        <span className="absolute -top-1 -right-0 
                            bg-green-500 text-white 
                            text-xs font-bold 
                            w-4 h-4 
                            flex items-center justify-center 
                            rounded-full">
                            {cart.length}
                        </span>
                    </div>
                </div>
                {openMobileMenu && <div className='sm:block md:hidden fixed inset-0 bg-black/30 w-full z-30'>
                    <div className='fixed inset-y-0 left-0 bg-white w-[70%] p-2'>
                        <div className='flex justify-between items-center'>
                            <div className="relative inline-block cursor-pointer">
                                <i className="fa-regular fa-heart text-2xl" onClick={() => { setOpenWishlist(true) }}></i>
                                <span className="absolute -top-0 -right-0 
                            bg-green-500 text-white 
                            text-[10px] font-bold 
                            w-4 h-4 
                            flex items-center justify-center 
                            rounded-full">
                                    {wishlist.length}
                                </span>
                            </div>
                            <RxCross1 size={24} onClick={() => setOpenMobileMenu(false)} className='cursor-pointer' />
                        </div>
                        <div className='relative border-2 border-[#3957DB] rounded-md text-lg mt-6'>
                            <input
                                type="text"
                                placeholder='Search Product...'
                                className='w-full px-2 py-1 focus:outline-none'
                                onChange={(e) => setSearchTerm(e.target.value)}
                                value={searchTerm}
                            />
                            <i className="fa-solid fa-magnifying-glass mr-2 absolute right-[4px] top-[8px]"></i>
                        </div>
                        <div className='flex flex-col gap-4 absolute bg-white z-50 py-8'>
                            {
                                searchData.map((product, index) => (
                                    <Link
                                        className='flex items-center px-8 gap-2'
                                        to={`/products/${product._id}`}
                                        onClick={() => {
                                            setSearchTerm("")
                                            setSearchData([])
                                        }}
                                    >
                                        <img
                                            src={getImageUrl(product.images[0])}
                                            alt=""
                                            className='w-10'
                                        />
                                        <p>{product.name}</p>
                                    </Link>
                                ))
                            }
                        </div>
                        <div className='flex flex-col gap-4 ml-4 my-8'>
                            <Link to='/' className='text-lg font-semibold'>Home</Link>
                            <Link to='/best-selling' className='text-lg font-semibold'>Best Selling</Link>
                            <Link to='/products' className='text-lg font-semibold'>Products</Link>
                            <Link to='/events' className='text-lg font-semibold'>Events</Link>
                            <Link to='/faq' className='text-lg font-semibold'>FAQ</Link>
                        </div>
                        <div className='flex justify-center my-6'>
                            <Link
                                to={sellerLogin ? "/shop-dashboard" : "/create-shop"}
                                className='bg-black text-white px-4 py-3 rounded-lg font-semibold cursor-pointer'
                            >
                                {sellerLogin ? "Go To DashBoard" : "Become Seller"}
                                <i
                                    className="fa-solid fa-angle-right">
                                </i>
                            </Link>
                        </div>
                        <div className="flex justify-center items-center cursor-pointer mt-16" onClick={() => navigate('/profile')}>
                            <div className='w-20 h-20 flex justify-center items-center'>
                                {uLoggedIn
                                    ? <img
                                        src={getImageUrl(userData?.avator)}
                                        alt=""
                                        className="object-cover rounded-full w-full h-full"
                                    />
                                    : <i className="fa-regular fa-circle-user w-full h-full"></i>
                                }
                            </div>

                        </div>

                    </div>
                </div>}
                {openCart && <Cart setOpenCart={setOpenCart} />}
                {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}
            </div>
            <div className='hidden md:block sticky top-0 z-50'>
                <Navbar cart={cart} openCart={openCart} setOpenCart={setOpenCart} wishlist={wishlist} openWishlist={openWishlist} setOpenWishlist={setOpenWishlist} uLoggedIn={uLoggedIn} userData={userData} />
            </div>
        </>
    )
}


export default Header
