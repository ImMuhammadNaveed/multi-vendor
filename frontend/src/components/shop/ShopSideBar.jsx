import { useContext } from "react"
import { shopContext } from '../../context/ShopContext'
import axios from "axios"
import { Link } from "react-router-dom"

function ShopSideBar({ shopData, shopProducts, owner }) {
    const { backend_url } = useContext(shopContext)
    async function logout() {
        try {
            const { data } = await axios.post(backend_url + "/api/shop/logout", {}, { withCredentials: true })
            if (data.success) {
                alert(data.message)
            }
        } catch (error) {
            console.log(error.response.data.message)
        }
    }
    return shopData && shopProducts && (
        <>
            <div className="h-[100vh]">
                <div className="w-70 bg-white px-2 overflow-y-scroll h-[90%] ml-10 rounded-md py-4">
                    <div className="flex flex-col justify-center items-center mx-auto w-full">
                        <img
                            src={backend_url + '/uploads/' + shopData.avator}
                            alt=""
                            className="w-35 h-35 rounded-full object-cover"
                        />
                        <p className="text-lg font-semibold mt-2">{shopData.name}</p>
                    </div>

                    <div className="flex flex-col gap-4 mt-8">
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
                            <p className='text-sm'>--</p>
                        </div>
                        <div >
                            <p className='font-semibold text-sm'>Joined On</p>
                            <p className='text-sm'>{shopData.createdAt.split("T")[0]}</p>
                        </div>
                    </div>
                    {
                        owner
                            ? <div className="flex flex-col gap-2 mt-6">
                                <Link className="bg-black text-white text-center w-full py-2 rounded-md" to='/shop-dashboard/settings'>Edit Shop</Link>
                                <button className="bg-black text-white w-full py-2 rounded-md cursor-pointer" onClick={logout}>Log Out</button>
                            </div>
                            : ""
                    }

                </div>

            </div>
        </>
    )
}

export default ShopSideBar