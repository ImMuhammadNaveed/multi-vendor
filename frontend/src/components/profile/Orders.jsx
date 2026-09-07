import { DataGrid } from '@mui/x-data-grid'
import { GoArrowRight } from "react-icons/go";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserOrders } from '../../redux/thunks/order';
import { useDispatch, useSelector } from 'react-redux';
import OrderAnimation from '../../assets/OrderAnimation'
function Orders() {
    const userLogin = useSelector(state=> state.user.userLogin)
    const dispatch = useDispatch()
    useEffect(() => {
        if (userLogin) {
          dispatch(getUserOrders())
        }
      }, [userLogin])
    const orders = useSelector(state=> state.order.userOrders)
    const loading = useSelector(state => state.order.userOrdersLoading)

    
    const rows = orders && orders.map((item) => ({
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
                        <Link to={`/user/order/${params.row.id}`}>
                            <GoArrowRight size={22} />
                        </Link>
                    </div>
                </>)
            }
        },
    ]
    if(loading){
        return <OrderAnimation/>
    }
    return (
            <div className='w-full max-w-[350px] md:max-w-none flex items-center justify-center' style={{height: 408}}>
                <DataGrid
                // className="w-full "
                columns={columns}
                rows={rows}
                pageSize={5}
                // autoHeight 
                // disableColumnMenu
            />
            </div>
            
    )
}
export default Orders
