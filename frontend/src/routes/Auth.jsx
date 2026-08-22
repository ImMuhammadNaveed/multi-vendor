import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export function UserProtectedRoute() {
    const {userLogin, userChecked} = useSelector(state=> state.user)
    const location = useLocation()
    if(!userChecked){
        return <>Loading...</>
    }
    if(!userLogin){
        return <Navigate to='/login' state={{from: location}} replace/>
    }
    return <Outlet/>
}

export function SellerProtectedRoute() {
    const {sellerLogin, sellerChecked} = useSelector(state=> state.shop)
    if(!sellerChecked){
        return <>Loading...</>
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
        return <>Loading...</>
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