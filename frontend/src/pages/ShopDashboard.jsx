import DashboardSideBar from "../components/shop/DashboardSideBar"
import Header from "../components/shop/Header"
import { Outlet } from 'react-router-dom'

function ShopDashboard() {
    return (
        <>
            <div className="bg-gray-100 h-screen flex flex-col">
                <div className="top-0 z-50 sticky">
                    <Header />
                </div>
                
                <div className="flex flex-1 overflow-hidden">
                    <DashboardSideBar/>
                    <div className="flex-1 overflow-y-auto">
                        <Outlet />
                    </div>
                </div>
            </div>

        </>
    )
}



export default ShopDashboard