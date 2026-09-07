import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { RxPerson } from "react-icons/rx";
import { IoBagOutline } from "react-icons/io5";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { LuMessageCircleMore } from "react-icons/lu";
import { MdOutlineTrackChanges } from "react-icons/md";
import { PiAddressBook } from "react-icons/pi";
import { AiOutlineLogout } from "react-icons/ai";
import { useState } from "react";
import { GrUserAdmin } from "react-icons/gr";
import { motion, AnimatePresence } from "framer-motion";
import ButtonSpinner from "../components/loading/ButtonSpinner";

function Profile() {
    const [active, setActive] = useState(1)
    const location = useLocation()
    return (
        <>
            <div className="bg-[#F5F6FB] py-12 px-3 lg:px-20 md:px-12">
                <div className="flex items-center w-full max-w-7xl mx-auto">
                    <div className="w-16 md:w-70 shrink-0">
                        <ProfileComponents />
                    </div>
                    <div className="flex-1 h-[408px] min-w-0 ml-4 md:ml-6 rounded-md">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={location.pathname}
                                initial={{ opacity: 0, x: 8 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -8 }}
                                transition={{ duration: 0.25, ease: 'easeInOut' }}
                            >
                                <Outlet />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

            </div>
        </>
    )
}
export default Profile


import { RiLockPasswordLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/thunks/user";

function ProfileComponents({ setActive, active }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)
    const [loggingOut, setLoggingOut] = useState(false)
    const linkClass = ({ isActive }) => `flex items-center justify-center md:justify-start mx-4 transition-colors ${isActive ? "text-red-500 font-semibold" : "text-gray-700 hover:text-red-500"}`

    async function logout() {
        try {
            setLoggingOut(true)
            await dispatch(logoutUser()).unwrap()
        } finally {
            setLoggingOut(false)
        }
    }
    return (
        <div className="bg-white w-16 md:w-70 flex flex-col gap-6 py-6 rounded-md">
            <NavLink to='/profile' end replace className={linkClass}>
                <RxPerson className="" size={18} /> <span className="hidden md:block ml-2">Profile</span>
            </NavLink>
            <NavLink to='/profile/orders' replace className={linkClass}>
                <IoBagOutline className="" size={18} /> <span className="hidden md:block ml-2">Orders</span>
            </NavLink>
            <NavLink to='/profile/refunds' replace className={linkClass}>
                <HiOutlineReceiptRefund className="" size={18} /> <span className="hidden md:block ml-2">Refunds</span>
            </NavLink>
            <NavLink to='/profile/inbox' replace className={linkClass}>
                <LuMessageCircleMore className="" size={18} /> <span className="hidden md:block ml-2">Inbox</span>
            </NavLink>
            <NavLink to='/profile/track-orders' replace className={linkClass}>
                <MdOutlineTrackChanges className="" size={18} /> <span className="hidden md:block ml-2">Track Order</span>
            </NavLink>
            <NavLink to='/profile/change-password' replace className={linkClass}>
                <RiLockPasswordLine className="" size={18} /> <span className="hidden md:block ml-2">Change Password</span>
            </NavLink>
            <NavLink to='/profile/address' replace className={linkClass}>
                <PiAddressBook className="" size={18} /> <span className="hidden md:block ml-2">Address</span>
            </NavLink>
            {
                user.role === "Admin"
                    ? <NavLink to='/admin-dashboard' className={linkClass}>
                        <GrUserAdmin className="" size={18} /> <span className="hidden md:block ml-2">Admin Dashboard</span>
                    </NavLink>
                    : ""
            }
            <button
                className='flex justify-center items-center md:justify-start mx-4 text-gray-700 hover:text-red-500 transition-colors cursor-pointer disabled:opacity-60'
                onClick={logout}
                disabled={loggingOut}
            >
                {loggingOut && <ButtonSpinner size={14} />}
                <AiOutlineLogout className="" size={18} /> <span className="hidden md:block ml-2">Logout</span>
            </button>
        </div>
    )
}



