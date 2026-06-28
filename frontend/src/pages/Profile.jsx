import { Form, NavLink, Outlet } from "react-router-dom";
import { RxPerson } from "react-icons/rx";
import { IoBagOutline } from "react-icons/io5";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { LuMessageCircleMore } from "react-icons/lu";
import { MdOutlineTrackChanges } from "react-icons/md";
import { MdPayment } from "react-icons/md";
import { PiAddressBook } from "react-icons/pi";
import { AiOutlineLogout } from "react-icons/ai";
import { useState } from "react";

function Profile() {
    const [active, setActive] = useState(1)
    return (
        <>
            <div className="bg-[#F5F6FB] py-12 px-20 flex">
                <ProfileComponents />
                <div className="flex-1 mx-4">
                    <Outlet/>
                </div>
            </div>
        </>
    )
}
export default Profile


import { RiLockPasswordLine } from "react-icons/ri";
function ProfileComponents({ setActive, active }) {
    const linkClass = ({isActive})=>`flex items-center ml-4 transition-colors ${isActive? "text-red-500 font-semibold" : "text-gray-700 hover:text-red-500"}`
    return (
        <div className="bg-white w-70 flex flex-col gap-6 py-6 rounded-md">
            <NavLink to='/profile' end className={linkClass}>
                <RxPerson className="mr-2" size={18} /> Profile
            </NavLink>
            <NavLink to='/profile/orders' className={linkClass}>
                <IoBagOutline className="mr-2" size={18} /> Orders
            </NavLink>
            <NavLink to='/profile/refunds' className={linkClass}>
                <HiOutlineReceiptRefund className="mr-2" size={18} /> Refunds
            </NavLink>
            <NavLink to='/profile/inbox' className={linkClass}>
                <LuMessageCircleMore className="mr-2" size={18} /> Inbox
            </NavLink>
            <NavLink to='/profile/track-orders' className={linkClass}>
                <MdOutlineTrackChanges className="mr-2" size={18} /> Track Order
            </NavLink>
            <NavLink to='/profile/change-password' className={linkClass}>
                <RiLockPasswordLine className="mr-2" size={18} /> Change Password
            </NavLink>
            <NavLink to='/profile/address' className={linkClass}>
                <PiAddressBook className="mr-2" size={18} /> Address
            </NavLink>
            <NavLink to='/profile' end className={linkClass}>
                <AiOutlineLogout className="mr-2" size={18} /> Logout
            </NavLink>
        </div>
    )
}



