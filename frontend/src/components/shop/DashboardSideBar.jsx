import { NavLink } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FiShoppingBag } from "react-icons/fi";
import { FiPackage } from "react-icons/fi";
import { AiOutlineFolderAdd } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill } from "react-icons/ci";
import { BiMessageSquareDetail } from "react-icons/bi";
import { AiOutlineGift } from "react-icons/ai";
import { HiOutlineReceiptRefund } from "react-icons/hi2";
import { CiSettings } from "react-icons/ci";
import { useState } from "react";

function DashboardSideBar({active, setActive}) {
    const linkClass = (({isActive})=>`flex items-center gap-2 text-sm ${isActive?"text-[crimson]":"text-[#555]"}` )
    return (
        <>
            <div className="w-60 bg-white pl-4 py-6 flex flex-col gap-6">
                <NavLink to='/shop-dashboard' end className={linkClass}>
                    <span>
                        <RxDashboard size={20} />
                    </span>
                    <span>
                        Dashboard
                    </span>
                </NavLink>
                <NavLink to='/shop-dashboard/all-orders' className={linkClass}>
                    <span>
                        <FiShoppingBag size={20} />
                    </span>
                    <span>
                        All Orders
                    </span>
                </NavLink>
                <NavLink to='/shop-dashboard/all-products' className={linkClass}>
                    <span>
                        <FiPackage size={20} />
                    </span>
                    <span>
                        All Products
                    </span>
                </NavLink>
                <NavLink to='/shop-dashboard/create-product' className={linkClass}>
                    <span>
                        <AiOutlineFolderAdd size={20} />
                    </span>
                    <span>
                        Create Product
                    </span>
                </NavLink>
                <NavLink to='/shop-dashboard/all-events' className={linkClass}>
                    <span>
                        <MdOutlineLocalOffer size={20} />
                    </span>
                    <span>
                        All Events
                    </span>
                </NavLink>
                <NavLink to='/shop-dashboard/create-event' className={linkClass}>
                    <span>
                        <VscNewFile size={20} />
                    </span>
                    <span>
                        Create Event
                    </span>
                </NavLink>
                <NavLink to='/shop-dashboard/withdraw-money' className={linkClass}>
                    <span>
                        <CiMoneyBill size={20} />
                    </span>
                    <span>
                        Withdraw Money
                    </span>
                </NavLink>
                <NavLink to='/shop-dashboard/messages' className={linkClass}>
                    <span>
                        <BiMessageSquareDetail size={20} />
                    </span>
                    <span>
                        Shop Inbox
                    </span>
                </NavLink>
                <NavLink to='/shop-dashboard/coupons' className={linkClass}>
                    <span>
                        <AiOutlineGift size={20} />
                    </span>
                    <span>
                        Discount Codes
                    </span>
                </NavLink>
                <NavLink to='/shop-dashboard/refunds' className={linkClass}>
                    <span>
                        <HiOutlineReceiptRefund size={20} />
                    </span>
                    <span>
                        Refunds
                    </span>
                </NavLink>
                <NavLink to='/shop-dashboard/settings' className={linkClass}>
                    <span>
                        <CiSettings size={20} />
                    </span>
                    <span>
                        Settings
                    </span>
                </NavLink>
            </div>
        </>
    )
}


export default DashboardSideBar