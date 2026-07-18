import { DataGrid } from '@mui/x-data-grid'
import { GoArrowRight } from "react-icons/go";
import { useContext, useEffect } from 'react';
import { userContext } from '../../context/UserContext';
import { Link } from 'react-router-dom';
import { backend_url } from '../../server';
import { getUserOrdersAction } from '../../redux/actions/user';
import { useSelector } from 'react-redux';
function Orders() {
    useEffect(() => { getUserOrdersAction() }, [])
    const orders = useSelector(state=> state.user.userOrders)

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
export default Orders