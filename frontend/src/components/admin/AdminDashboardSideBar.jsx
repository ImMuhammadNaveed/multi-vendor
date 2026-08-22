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
import { PiChalkboardTeacher } from "react-icons/pi";
import { BsPeople } from "react-icons/bs";
import { SlHandbag } from "react-icons/sl";



import { useState } from "react";

function AdminDashboardSideBar({active, setActive}) {
    const linkClass = (({isActive})=>`flex items-center gap-2 text-sm ${isActive?"text-[crimson]":"text-[#555]"}` )
    return (
        <>
            <div className="lg:w-60 bg-white px-4 py-6 flex flex-col gap-6 border-r border-gray-300">
                <NavLink to='/admin-dashboard' end className={linkClass}>
                    <span>
                        <RxDashboard size={20} />
                    </span>
                    <span className='lg:block hidden'>
                        Dashboard
                    </span>
                </NavLink>
                <NavLink to='/admin-dashboard/all-orders' className={linkClass}>
                    <span>
                        <FiShoppingBag size={20} />
                    </span>
                    <span className='lg:block hidden'>
                        All Orders
                    </span>
                </NavLink>
                <NavLink to='/admin-dashboard/all-sellers' className={linkClass}>
                    <span>
                        <PiChalkboardTeacher size={20} />
                    </span>
                    <span className='lg:block hidden'>
                        All Sellers
                    </span>
                </NavLink>
                <NavLink to='/admin-dashboard/all-users' className={linkClass}>
                    <span>
                        <BsPeople size={20} />
                    </span>
                    <span className='lg:block hidden'>
                        All Users
                    </span>
                </NavLink>
                <NavLink to='/admin-dashboard/all-products' className={linkClass}>
                    <span>
                        <SlHandbag size={20} />
                    </span>
                    <span className='lg:block hidden'>
                        All Products
                    </span>
                </NavLink>
                
                <NavLink to='/admin-dashboard/all-events' className={linkClass}>
                    <span>
                        <MdOutlineLocalOffer size={20} />
                    </span>
                    <span className='lg:block hidden'>
                        All Events
                    </span>
                </NavLink>
                <NavLink to='/admin-dashboard/withdraw-request' className={linkClass}>
                    <span>
                        <CiMoneyBill size={20} />
                    </span>
                    <span className='lg:block hidden'>
                        Withdraw Request
                    </span>
                </NavLink>
                
                {/* <NavLink to='/admin-dashboard/settings' className={linkClass}>
                    <span>
                        <CiSettings size={20} />
                    </span>
                    <span>
                        Settings
                    </span>
                </NavLink> */}
            </div>
        </>
    )
}


export default AdminDashboardSideBar