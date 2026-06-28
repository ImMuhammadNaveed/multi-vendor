import DashboardSideBar from "../components/shop/DashboardSideBar"
import Header from "../components/shop/Header"
import { Outlet } from 'react-router-dom'

function ShopDashboard() {
    return (
        <>
            <div className="bg-gray-100 min-h-screen flex flex-col">
                <Header />
                <div className="flex flex-1">
                    <DashboardSideBar/>
                    <Outlet />
                </div>
            </div>

        </>
    )
}



export default ShopDashboard