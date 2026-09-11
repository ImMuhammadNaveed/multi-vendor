import { useEffect } from "react"
import { Link } from "react-router-dom"
import { getImageUrl } from "../../utils/image"
import { useDispatch } from 'react-redux'
import { logoutSeller } from '../../redux/thunks/shop'
import ButtonSpinner from '../loading/ButtonSpinner'
import { useState } from 'react'

function ShopSideBar({ shopData, shopProducts, owner, shopRating }) {
    const dispatch = useDispatch()
    const [loggingOut, setLoggingOut] = useState(false)
    async function logout() {
        try {
            setLoggingOut(true)
            await dispatch(logoutSeller()).unwrap()
        } finally {
            setLoggingOut(false)
        }
    }
    useEffect(() => { console.log(shopData) }, [])
    return shopProducts && (
        <>
            <div className="h-full lg:w-90 w-full bg-white px-4 lg:ml-10 ml-0 rounded-md py-4 flex flex-col justify-between">
                <div className="flex flex-col justify-center items-center mx-auto w-full">
                    <img
                        src={getImageUrl(shopData.avator)}
                        alt=""
                        className="w-25 h-25 rounded-full object-cover"
                    />
                    <p className="text-lg font-semibold mt-2">{shopData.name}</p>
                </div>

                <div className="flex flex-col gap-3 mt-2">
                    <div >
                        <p className='font-semibold text-sm'>Address</p>
                        <p className='text-sm'>{shopData.address}</p>
                    </div>
                    <div >
                        <p className='font-semibold text-sm'>Phone Number</p>
                        <p className='text-sm'>{shopData.phoneNumber}</p>
                    </div>
                    <div >
                        <p className='font-semibold text-sm'>Total Products</p>
                        <p className='text-sm'>{shopProducts.length}</p>
                    </div>
                    <div >
                        <p className='font-semibold text-sm'>Shop Ratings</p>
                        <p className='text-sm'>{shopRating}</p>
                    </div>
                    <div >
                        <p className='font-semibold text-sm'>Joined On</p>
                        <p className='text-sm'>{shopData.createdAt && shopData.createdAt.split("T")[0]}</p>
                    </div>
                </div>
                {
                    owner
                        ? <div className="flex flex-col gap-1 mt-2">
                            <Link className="bg-black text-white text-center w-full py-2 rounded-md" to='/shop-dashboard/settings'>Edit Shop</Link>
                            <button
                                className="bg-black text-white w-full py-2 rounded-md cursor-pointer disabled:opacity-60"
                                onClick={logout}
                                disabled={loggingOut}
                            >
                                <span className="inline-flex items-center gap-2">
                                    {loggingOut && <ButtonSpinner size={14} />}
                                    Log Out
                                </span>
                            </button>
                        </div>
                        : ""
                }

            </div>
        </>
    )
}

export default ShopSideBar
