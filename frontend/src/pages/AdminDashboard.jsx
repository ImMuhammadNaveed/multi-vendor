import AdminDashboardSideBar from "../components/admin/AdminDashboardSideBar"
import { Outlet } from 'react-router-dom'
import AdminHeader from "../components/admin/AdminHeader"

function AdminDashboard() {
    return (
        <>
            <div className="bg-gray-100 h-screen flex flex-col">
                <div className="top-0 z-50 sticky">
                    <AdminHeader />
                </div>
                <div className="flex flex-1 overflow-hidden">
                    <AdminDashboardSideBar />
                    <div className="flex-1 overflow-y-auto">
                        <Outlet />
                    </div>
                </div>
            </div>

        </>
    )
}

export default AdminDashboard