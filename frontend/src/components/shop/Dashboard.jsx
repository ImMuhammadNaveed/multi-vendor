import { AiOutlineMoneyCollect } from "react-icons/ai";
import { RxBorderSplit } from "react-icons/rx";
import { useContext, useEffect } from "react";
import { shopContext } from "../../context/ShopContext";
import { Link } from "react-router-dom";
function Dashboard() {
    const { backend_url } = useContext(shopContext)
    const { orders } = useContext(shopContext)
    const topOrders = orders.slice(0, 3).reverse()

    const { sellerData } = useContext(shopContext)
    const { shopProducts, getProductsOfShop } = useContext(productContext)
    useEffect(() => {
        if (sellerData?._id) {
            getProductsOfShop(sellerData._id)
        }
    }, [sellerData])

    const deliveredOrders = orders && orders.filter((order)=>order.status==="Delivered")
    const totalPrice = deliveredOrders && deliveredOrders.reduce((acc, item)=>acc+item.totalPrice,0)
    const serviceCharges = totalPrice&&totalPrice*0.1
    const availableBalance = totalPrice - serviceCharges
    return (
        <>
            <div className="w-full my-4 mx-8">
                <p className="text-xl font-semibold mb-2">Overview</p>
                <div className="flex justify-between">
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
                        <p className="font-semibold text-xl ml-4 my-2">{availableBalance}</p>
                        <Link className="text-sm text-cyan-800 cursor-pointer">Withdram Money</Link>
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
import { productContext } from "../../context/ProductContext";
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