import { DataGrid } from '@mui/x-data-grid'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersAction } from '../../redux/actions/order'

function AdminAllOrders() {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getAllOrdersAction())
    }, [])
    const orders = useSelector(state=> state.order.allOrders)
    const rows = orders && orders.map((item) => ({
        id: item._id,
        status: item.status,
        itemsQty: item.cart.length,
        total: `$${item.totalPrice}`,
        orderDate: item.createdAt.slice(0,10)
    }))
    const columns = [
        { field: 'id', headerName: 'Order ID', minWidth: 150, flex: 0.7 },
        { field: 'status', headerName: 'Status', minWidth: 130, flex: 0.7 },
        { field: 'itemsQty', headerName: 'Items Quantity', minWidth: 130, flex: 0.7 },
        { field: 'total', headerName: 'Total', minWidth: 130, flex: 0.7 },
        { field: 'orderDate', headerName: 'Order Date', minWidth: 150, flex: 0.7, align: 'left'},
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

export default AdminAllOrders