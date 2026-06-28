import { Link } from 'react-router-dom'
import logo from '../../static/logo.svg'
import Navbar from './Navbar'

import { useContext, useEffect, useState } from 'react'
import { productContext } from '../../context/ProductContext'
import { shopContext } from '../../context/ShopContext'

function Header() {
    const { allProducts, backend_url } = useContext(productContext)
    const [searchTerm, setSearchTerm] = useState("")
    const [searchData, setSearchData] = useState([])
    const {sLoggedIn} = useContext(shopContext)

    useEffect(() => {
        if (searchTerm === "") {
            setSearchData([])
            return
        }
        const toShow = allProducts && allProducts.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
        setSearchData(toShow)
    }, [searchTerm, allProducts])
    return (
        <>
            <div className='flex items-center justify-between w-[90%] m-auto py-5'>
                <img src={logo} alt="" />
                <div className='relative'>
                    <div className='border-2 border-[#3957DB] rounded-md text-lg'>
                        <input
                            type="text"
                            placeholder='Search Product...'
                            className='w-130 px-2 py-1 focus:outline-none'
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
                                        src={`${backend_url}/uploads/${product.images[0]}`}
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
                    to={sLoggedIn?"/shop-dashboard" :"/create-shop"}
                    className='bg-black text-white px-4 py-3 rounded-lg font-semibold cursor-pointer'
                >
                    {sLoggedIn?"Go To DashBoard" :"Become Seller"}
                    <i
                        className="fa-solid fa-angle-right">
                    </i>
                </Link>
            </div>
            <Navbar />
        </>
    )
}


export default Header