import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import AddressAnimation from '../assets/AddressAnimation'
import ConversationAnimation from '../assets/ConversationAnimation'
import OrderAnimation from '../assets/OrderAnimation'
import OrderDetailsAnimation from '../assets/OrderDetailsAnimation'
import ProfileAnimation from '../assets/ProfileAnimation'
import ProtectedRouteAnimation from '../assets/ProtectedRouteAnimation'
import UserMessagesAnimation from '../assets/UserMessagesAnimation'
import SellerDashboardAnimation from '../assets/SellerDashboardAnimation'
import AdminDashboardAnimation from '../assets/AdminDashboardAnimation'
import TrackOrderAnimation from '../assets/TrackOrderAnimation'

function normalizePathname(pathname) {
    return pathname.replace(/\/+$/, '')
}

function getUserRouteSkeleton(pathname) {
    const path = normalizePathname(pathname)

    if (path === '/profile' || path === '/profile/change-password') {
        return <ProfileAnimation />
    }

    if (path === '/profile/address' || path === '/shipping') {
        return <AddressAnimation />
    }

    if (
        path === '/profile/orders' ||
        path === '/profile/refunds'
    ) {
        return <OrderAnimation />
    }

    if (path === '/profile/track-orders' || path.startsWith('/user/track/order/')) {
        return <TrackOrderAnimation />
    }

    if (path === '/profile/inbox' || path === '/inbox') {
        return <ConversationAnimation />
    }

    if (path.startsWith('/conversation/')) {
        return <UserMessagesAnimation />
    }

    if (path.startsWith('/user/order/')) {
        return <OrderDetailsAnimation />
    }

    return <ProtectedRouteAnimation />
}

function getSellerRouteSkeleton(pathname) {
    const path = normalizePathname(pathname)

    if (path.startsWith('/shop/order/')) {
        return <OrderDetailsAnimation />
    }

    if (path === '/shop-dashboard') {
        return <SellerDashboardAnimation />
    }

    switch (path) {
        case '/shop-dashboard/all-orders':
        case '/shop-dashboard/all-products':
        case '/shop-dashboard/all-events':
        case '/shop-dashboard/coupons':
        case '/shop-dashboard/refunds':
            return <OrderAnimation />
        case '/shop-dashboard/messages':
            return <ConversationAnimation />
        case '/shop-dashboard/create-product':
        case '/shop-dashboard/create-event':
        case '/shop-dashboard/withdraw-money':
        case '/shop-dashboard/settings':
            return <ProfileAnimation />
        default:
            return <ProtectedRouteAnimation />
    }
}

function getAdminRouteSkeleton(pathname) {
    const path = normalizePathname(pathname)

    if (path === '/admin-dashboard') {
        return <AdminDashboardAnimation />
    }

    switch (path) {
        case '/admin-dashboard/all-orders':
        case '/admin-dashboard/all-sellers':
        case '/admin-dashboard/all-users':
        case '/admin-dashboard/all-products':
        case '/admin-dashboard/all-events':
        case '/admin-dashboard/withdraw-request':
            return <OrderAnimation />
        default:
            return <ProtectedRouteAnimation />
    }
}

export function UserProtectedRoute() {
    const {userLogin, userChecked} = useSelector(state=> state.user)
    const location = useLocation()
    if(!userChecked){
        return getUserRouteSkeleton(location.pathname)
    }
    if(!userLogin){
        return <Navigate to='/login' state={{from: location}} replace/>
    }
    return <Outlet/>
}

export function SellerProtectedRoute() {
    const {sellerLogin, sellerChecked} = useSelector(state=> state.shop)
    const location = useLocation()
    if(!sellerChecked){
        return getSellerRouteSkeleton(location.pathname)
    }
    if(!sellerLogin){
        return <Navigate to='/login-shop' replace/>
    }
    return <Outlet/>
}

export function AdminProtectedRoute(){
    const {userLogin, userChecked, user} = useSelector(state=> state.user)
    const location = useLocation()
    if(!userChecked){
        return getAdminRouteSkeleton(location.pathname)
    }
    if(!userLogin){
        return <Navigate to='/login' state={{from: location}}/>
    }
    if(user.role !== "Admin"){
        toast.error("You are not authorized!")
        return <Navigate to='/' replace/>
    }
    return <Outlet/>
}
