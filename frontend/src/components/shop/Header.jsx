import { useContext } from "react"
import { shopContext } from '../../context/ShopContext'
import { Link } from "react-router-dom"
import logo from '../../static/logo.svg'
import { FiGift } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiShoppingBag } from "react-icons/fi";
import { FiPackage } from "react-icons/fi";
import { BiMessageSquareDetail } from "react-icons/bi";

function Header() {
    const { shopData, backend_url, sellerData } = useContext(shopContext)
    return (
        <>
            <div>
                <div className="flex justify-between items-center px-5 h-17 bg-white shadow-lg">
                    <Link to={`/shop/${sellerData&&sellerData._id}`}>
                        <img src={logo} alt="" />
                    </Link>
                    <div className="flex items-center gap-5">
                        <Link>
                            <FiGift size={23} />
                        </Link>
                        <Link>
                            <MdOutlineLocalOffer size={23} />
                        </Link>
                        <Link>
                            <FiShoppingBag size={23} />
                        </Link>
                        <Link>
                            <FiPackage size={23} />
                        </Link>
                        <Link>
                            <BiMessageSquareDetail size={23} />
                        </Link>
                        <Link>
                        {shopData&&
                            <img
                                src={backend_url + "/uploads/" + shopData.avator}
                                alt=""
                                className="w-10 h-10 object-cover rounded-full"
                            />
                        }
                        </Link>
                    </div>

                </div>
                <hr className="text-gray-400 h-[2px]" />
            </div>
        </>
    )
}


export default Header