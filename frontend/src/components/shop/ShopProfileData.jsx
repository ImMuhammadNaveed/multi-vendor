import { Link } from 'react-router-dom'
// import {productData} from '../../static/data'
import Product from '../product/ProductCard'
import { useState } from 'react'
import ShopReviews from './ShopReviews'
import { useSelector } from 'react-redux'
import ProductCardAnimation from '../../assets/ProductCardAnimation'

function ShopProfileData({ shopProducts, owner, shopEvents }) {
    const [active, setActive] = useState(1)
    const shopReviews = shopProducts && shopProducts.map((product) => product.reviews).flat()
    const loadingP = useSelector(state => state.product.shopProductsLoading)
    const loadingE = useSelector(state => state.event.shopEventsLoading)

    return (shopProducts || loadingP) && (
        <>
            <div className='w-full lg:mx-8 h-full flex flex-col min-h-0'>
                <div className='flex lg:flex-row flex-col-reverse items-center justify-between mb-8 shrink-0'>
                    <div className='flex items-center gap-5'>
                        <p className={`text-lg font-semibold ${active === 1 ? "text-[crimson]" : "text-[#555]"} cursor-pointer`} onClick={() => setActive(1)}>Shop Products</p>
                        <p className={`text-lg font-semibold ${active === 2 ? "text-[crimson]" : "text-[#555]"} cursor-pointer`} onClick={() => setActive(2)}>Running Event</p>
                        <p className={`text-lg font-semibold ${active === 3 ? "text-[crimson]" : "text-[#555]"} cursor-pointer`} onClick={() => setActive(3)}>Shop Reviews</p>
                    </div>
                    <div className='my-6 lg:my-0'>
                        {
                            owner
                                ? <Link to='/shop-dashboard' className='bg-black text-white px-7 py-2 rounded-md'>
                                    Go Dashboard
                                </Link>
                                : ""
                        }

                    </div>
                </div>
                <div className='flex-1 min-h-0 overflow-y-auto'>
                    {
                        active === 1 && <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7'>
                            {
                                loadingP
                                    ? Array.from({ length: 6 }, (_, index) => (
                                        <ProductCardAnimation key={index} />
                                    ))
                                    : shopProducts.map((item) => (
                                        <Product item={item} key={item._id} />
                                    ))
                            }
                        </div>
                    }
                    {
                        active === 2 && <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7'>
                            {
                                loadingE
                                    ? <div>
                                        {
                                            Array.from({ length: 6 }, (_, index) => (
                                                <ProductCardAnimation key={index} />
                                            ))
                                        }
                                    </div>
                                    : shopEvents && shopEvents.length !== 0
                                        ? <div>
                                            {
                                                shopEvents.map((item) => (
                                                    <Product item={item} key={item._id} />
                                                ))
                                            }
                                        </div>
                                        : <div className='flex justify-center items-center w-full'>
                                            <p className='text-xl font-semibold'>We have currently no Events!</p>
                                        </div>
                            }
                        </div>
                    }
                    {
                        active === 3 && <div className='h-[360px] md:h-[360px] lg:h-auto'>
                            {shopReviews.length > 0
                                ? <ShopReviews shopReviews={shopReviews} />
                                : <div className='flex justify-center items-center w-full'>
                                    <p className='text-xl font-semibold'>This shop has currently no Reviews!</p>
                                </div>
                            }

                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default ShopProfileData
