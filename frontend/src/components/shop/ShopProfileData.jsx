import { Link } from 'react-router-dom'
// import {productData} from '../../static/data'
import Product from '../product/ProductCard'
import { useState } from 'react'

function ShopProfileData({ shopProducts, owner, shopEvents }) {
    const [active, setActive] = useState(1)

    return shopProducts && (
        <>
            <div className='w-full mx-8'>
                <div className='flex items-center justify-between mb-8'>
                    <div className='flex items-center gap-6'>
                        <p className={`text-lg font-semibold ${active === 1 ? "text-[crimson]" : "text-[#555]"} cursor-pointer`} onClick={() => setActive(1)}>Shop Products</p>
                        <p className={`text-lg font-semibold ${active === 2 ? "text-[crimson]" : "text-[#555]"} cursor-pointer`} onClick={() => setActive(2)}>Running Event</p>
                        <p className={`text-lg font-semibold ${active === 3 ? "text-[crimson]" : "text-[#555]"} cursor-pointer`} onClick={() => setActive(3)}>Shop Reviews</p>
                    </div>
                    <div>
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
                    active===1 &&<div className='grid grid-cols-3 gap-7'>
                    {
                        shopProducts.map((item) =>
                            <Product item={item} key={item._id} />
                        )
                    }
                </div>
                }
                {
                    active===2 && <div className='grid grid-cols-3 gap-7'>
                        {
                            shopEvents&& shopEvents.map((item)=>
                                <Product item={item} key={item._id} />
                            )
                        }
                    </div>
                }
                {
                    active===3 && <div>reviews</div>
                }
                
            </div>
        </>
    )
}

export default ShopProfileData