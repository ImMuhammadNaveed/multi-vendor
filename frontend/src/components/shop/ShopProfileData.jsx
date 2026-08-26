import { Link } from 'react-router-dom'
// import {productData} from '../../static/data'
import Product from '../product/ProductCard'
import { useEffect, useState } from 'react'
import ShopReviews from './ShopReviews'
import { useSelector } from 'react-redux'
import ProductCardAnimation from '../../assets/ProductCardAnimation'

function ShopProfileData({ shopProducts, owner, shopEvents }) {
    const [active, setActive] = useState(1)
    const shopReviews = shopProducts && shopProducts.map((product) => product.reviews).flat()
    const loadingP = useSelector(state=> state.product.loading)
    const loadingE = useSelector(state=> state.event.loading)

    return shopProducts && (
        <>
            <div className='w-full lg:mx-8'>
                <div className='flex lg:flex-row flex-col-reverse items-center justify-between mb-8'>
                    <div className='flex items-center gap-6'>
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
                {
                    active === 1 && <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7'>
                        {
                            shopProducts.map((item) =>
                                loadingP
                                    ? <ProductCardAnimation />
                                    : <Product item={item} key={item._id} />

                            )
                        }
                    </div>
                }
                {
                    active === 2 && <div >
                        {shopEvents.length !== 0
                            ? <div className='grid grid-cols-3 gap-7'>
                                {
                                    shopEvents && shopEvents.map((item) =>
                                        loadingE
                                            ? <ProductCardAnimation />
                                            : <Product item={item} key={item._id} />
                                    )
                                }
                            </div>
                            : <div className='flex justify-center items-center w-full'>
                                <p className='text-xl font-semibold'>We have currently no Events!</p>
                            </div>

                        }
                    </div>
                }
                {
                    active === 3 && <div>
                        <ShopReviews shopReviews={shopReviews} />
                    </div>
                }

            </div>
        </>
    )
}

export default ShopProfileData