import DashboardSideBar from "../components/shop/DashboardSideBar"
import Header from "../components/shop/Header"
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from "framer-motion"


function ShopDashboard() {
    const location = useLocation()
    return (
        <>
            <div className="bg-gray-100 h-screen flex flex-col">
                <div className="top-0 z-50 sticky">
                    <Header />
                </div>
                
                <div className="flex flex-1 overflow-hidden h-screen">
                    <DashboardSideBar/>
                    <div className="flex-1 overflow-y-auto h-full">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={location.pathname}
                                className="h-full flex flex-col"
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



export default ShopDashboard