import { Form, NavLink, Outlet, useNavigate } from "react-router-dom";
import { RxPerson } from "react-icons/rx";
import { IoBagOutline } from "react-icons/io5";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { LuMessageCircleMore } from "react-icons/lu";
import { MdOutlineTrackChanges } from "react-icons/md";
import { MdPayment } from "react-icons/md";
import { PiAddressBook } from "react-icons/pi";
import { AiOutlineLogout } from "react-icons/ai";
import { useContext, useState } from "react";
import { GrUserAdmin } from "react-icons/gr";

function Profile() {
    const [active, setActive] = useState(1)
    return (
        <>
            <div className="bg-[#F5F6FB] py-12 px-3 lg:px-20 md:px-12">
                <div className="flex items-start w-full max-w-7xl mx-auto">
                    <div className="w-16 md:w-70 shrink-0">
                    <ProfileComponents />
                </div>
                <div className="flex-1 min-w-0 ml-4 md:ml-6">
                    <Outlet />
                </div>
                </div>
                
            </div>
        </>
    )
}
export default Profile


import { RiLockPasswordLine } from "react-icons/ri";
import axios from "axios";
import { backend_url } from "../server";
import { setWishlist } from "../redux/slices/wishlist";
import { setCart } from "../redux/slices/cart";
import { setUser, setUserLogin, setUserConversations } from '../redux/slices/user'
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../socket/Socket";
import { toast } from "react-toastify";

function ProfileComponents({ setActive, active }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)
    const linkClass = ({ isActive }) => `flex items-center justify-center md:justify-start mx-4 transition-colors ${isActive ? "text-red-500 font-semibold" : "text-gray-700 hover:text-red-500"}`

    async function logout() {
        try {
            const { data } = await axios.post(backend_url + '/api/user/logout', {}, { withCredentials: true })
            if(data.success){
                toast.success(data.message)
            }else{
                toast.error(data.message)
            }
            navigate('/', {replace: true})
            dispatch(setUser({}))
            dispatch(setUserLogin(false))
            dispatch(setUserConversations([]))
            dispatch(setCart([]))
            dispatch(setWishlist([]))
            socket.emit("logout", user?._id)
        } catch (error) {
            toast.error(error.response?.data?.message)
            console.log(error)
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
            <button className='flex justify-center items-center md:justify-start mx-4 text-gray-700 hover:text-red-500 transition-colors cursor-pointer' onClick={logout}>
                <AiOutlineLogout className="" size={18} /> <span className="hidden md:block ml-2">Logout</span>
            </button>
        </div>
    )
}



