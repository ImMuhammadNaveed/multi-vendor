import { AiOutlineMoneyCollect } from "react-icons/ai";
import { RxBorderSplit } from "react-icons/rx";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { backend_url } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import SellerDashboardAnimation from "../../assets/SellerDashboardAnimation";
import { getShopProducts } from "../../redux/thunks/product";

function Dashboard() {
    const orders = useSelector(state=> state.order.sellerOrders)
    const topOrders = orders&&orders.slice(0, 3).reverse()

    const sellerData = useSelector(state=> state.shop.seller)
    const shopProducts = useSelector(state=> state.product.shopProducts)
    const sellerOrdersLoading = useSelector(state => state.order.sellerOrdersLoading)
    const shopProductsLoading = useSelector(state => state.product.shopProductsLoading)
    const dispatch = useDispatch()
    useEffect(() => {
        if (sellerData?._id) {
            dispatch(getShopProducts(sellerData._id))
        }
    }, [sellerData])

    if (sellerOrdersLoading || shopProductsLoading) {
        return <SellerDashboardAnimation />
    }

    return (
        <>
            <div className="w-full py-4 lg:px-8 px-2">
                <p className="text-xl font-semibold mb-2">Overview</p>
                <div className="flex lg:flex-row lg:justiy-start flex-col items-center lg:gap-0 gap-4 justify-between">
                    <div className="bg-white w-70 p-4 border border-gray-200">
                        <div className="flex items-center gap-2">
                            <AiOutlineMoneyCollect size={30} color="#9E9E9E" />
                            <p className="text-[#9E9E9E] items-center inline">
                                Account Balance
                                <span className="text-xs ml-1">
                                    (with 10% service charge)
                                </span>
                            </p>
                        </div>
                        <p className="font-semibold text-xl ml-4 my-2">{sellerData.availableBalance}</p>
                        <Link to={'/shop-dashboard/withdraw-money'} className="text-sm text-cyan-800 cursor-pointer">Withdram Money</Link>
                    </div>
                    <div className="bg-white w-70 p-4 border border-gray-200">
                        <div className="flex items-center gap-2">
                            <RxBorderSplit size={25} color="#9E9E9E" />
                            <p className="text-[#9E9E9E] items-center inline">
                                All Orders
                            </p>
                        </div>
                        <p className="font-semibold text-xl ml-4 my-2">{orders && orders.length}</p>
                        <Link 
                        className="text-sm text-cyan-800"
                        to='/shop-dashboard/all-orders'
                        >View Orders</Link>
                    </div>
                    <div className="bg-white w-70 p-4 border border-gray-200">
                        <div className="flex items-center gap-2">
                            <AiOutlineMoneyCollect size={25} color="#9E9E9E" />
                            <p className="text-[#9E9E9E] items-center inline">
                                All Products
                            </p>
                        </div>
                        <p className="font-semibold text-xl ml-4 my-2">{shopProducts && shopProducts.length}</p>
                        <Link 
                        className="text-sm text-cyan-800 cursor-pointer"
                        to='/shop-dashboard/all-products'
                        >View Products</Link>
                    </div>
                </div>
                <p className="text-xl font-semibold mt-6 mb-2">Latest Orders</p>
                <Orders topOrders={topOrders} />
            </div>
        </>
    )
}


import { DataGrid } from '@mui/x-data-grid'
import { GoArrowRight } from "react-icons/go";
function Orders({ topOrders }) {
    const rows = topOrders && topOrders.map((item) => ({
        id: item._id,
        status: item.status,
        itemsQty: item.cart.length,
        total: `$${item.totalPrice}`
    }))
    const columns = [
        { field: 'id', headerName: 'Order ID', minWidth: 150, flex: 0.7 },
        { field: 'status', headerName: 'Status', minWidth: 130, flex: 0.7 },
        { field: 'itemsQty', headerName: 'Items Quantity', minWidth: 130, flex: 0.7 },
        { field: 'total', headerName: 'Total', minWidth: 130, flex: 0.7 },
        {
            field: ' ',
            headerName: '',
            minWidth: 150,
            flex: 0.7,
            align: 'right',

            renderCell: (params) => {
                return (<>
                    <div className="w-full h-full flex justify-end items-center pr-4 cursor-pointer">
                        <Link to={`/shop/order/${params.row.id}`}>
                            <GoArrowRight size={22} />
                        </Link>
                    </div>
                </>)
            }
        },
    ]
    return (
        <div style={{ width: '100%', height: 400 }}>
            <DataGrid
                className="text-right"
                columns={columns}
                rows={rows}
                pageSize={10}
                autoHeight
            />
        </div>
    )
}
export default Dashboard
