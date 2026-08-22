import { useEffect } from "react"
import { Link } from "react-router-dom"
import logo from '../../static/logo.svg'
import { FiGift } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiShoppingBag } from "react-icons/fi";
import { FiPackage } from "react-icons/fi";
import { BiMessageSquareDetail } from "react-icons/bi";
import { backend_url } from "../../server";
import { useSelector } from "react-redux";

function Header() {
    const shopData = useSelector(state => state.shop.shop)
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
                        <div className="lg:flex items-center gap-7 hidden">
                            <Link to='/shop-dashboard/coupons'>
                                <FiGift size={23} />
                            </Link>
                            <Link to='/shop-dashboard/all-events'>
                                <MdOutlineLocalOffer size={23} />
                            </Link>
                            <Link to='/shop-dashboard/all-products'>
                                <FiShoppingBag size={23} />
                            </Link>
                            <Link to='/shop-dashboard/all-orders'>
                                <FiPackage size={23} />
                            </Link>
                            <Link to='/shop-dashboard/messages'>
                                <BiMessageSquareDetail size={23} />
                            </Link>
                        </div>
                        <Link to={`/shop/${sellerData?._id}`}>
                            {shopData &&
                                <img
                                    src={backend_url + "/uploads/" + sellerData.avator}
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


export default Header