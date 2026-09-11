import { useEffect } from "react"
import { Link } from "react-router-dom"
import logo from '../../static/logo.svg'
import { FiGift } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiShoppingBag } from "react-icons/fi";
import { FiPackage } from "react-icons/fi";
import { BiMessageSquareDetail } from "react-icons/bi";
import { getImageUrl } from "../../utils/image";
import { useSelector } from "react-redux";

function AdminHeader() {
    const userData = useSelector(state => state.user.user)
    const sellerData = useSelector(state => state.shop.seller)
    // useEffect(()=>{console.log(shopData)},[])
    return (
        <>
            <div>
                <div className="flex justify-between items-center px-5 h-17 bg-white border-b border-gray-300">
                    {/* <Link to={`/shop/${sellerData&&sellerData._id}`}>
                        <img src={logo} alt="" />
                    </Link> */}
                    <Link to='/'>
                        <img src={logo} alt="" />
                    </Link>
                    <div className="flex items-center gap-7">
                        <div className="hidden lg:flex items-center gap-7">
                            <Link to='/admin-dashboard/all-events'>
                                <MdOutlineLocalOffer size={23} />
                            </Link>
                            <Link to='/admin-dashboard/all-products'>
                                <FiShoppingBag size={23} />
                            </Link>
                            <Link to='/admin-dashboard/all-orders'>
                                <FiPackage size={23} />
                            </Link>
                        </div>

                        <Link to={`/profile`}>
                            {userData &&
                                <img
                                    src={getImageUrl(userData.avator)}
                                    alt=""
                                    className="w-10 h-10 object-cover rounded-full"
                                />
                            }
                        </Link>
                    </div>

                </div>
                {/* <hr className="text-gray-400 h-[2px]" /> */}
            </div>
        </>
    )
}


export default AdminHeader
