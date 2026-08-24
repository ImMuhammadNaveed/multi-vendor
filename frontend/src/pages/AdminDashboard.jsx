import AdminDashboardSideBar from "../components/admin/AdminDashboardSideBar"
import { Outlet, useLocation } from 'react-router-dom'
import AdminHeader from "../components/admin/AdminHeader"
import { AnimatePresence, motion } from "framer-motion"

function AdminDashboard() {
    const location = useLocation()
    return (
        <>
            <div className="bg-gray-100 h-screen flex flex-col">
                <div className="top-0 z-50 sticky">
                    <AdminHeader />
                </div>
                <div className="flex flex-1 overflow-hidden">
                    <AdminDashboardSideBar />
                    <div className="flex-1 overflow-y-auto">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={location.pathname}
                                initial={{ opacity: 0, x: 8 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -8 }}
                                transition={{ duration: 0.25, ease: 'easeOut' }}
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

export default AdminDashboard