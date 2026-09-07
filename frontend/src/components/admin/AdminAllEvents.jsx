import { DataGrid } from '@mui/x-data-grid'
import { IoEyeOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { getAllEvents } from '../../redux/thunks/event';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import OrderAnimation from '../../assets/OrderAnimation'

function AdminAllEvents(params) {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllEvents())
    }, [dispatch])
    const events = useSelector(state => state.event.allEvents)
    const loading = useSelector(state => state.event.allEventsLoading)

    const rows = events && events.map((item) => ({
        id: item._id,
        name: item.name,
        price: item.price,
        stock: item.stock,
        soldOut: item.soldOut,

    }))
    useEffect(()=>{console.log(rows)},[rows])
    const columns = [
        { field: 'id', headerName: 'Product ID', minWidth: 90, flex: 0.6 },
        { field: 'name', headerName: 'Name', minWidth: 100, flex: 0.6 },
        { field: 'price', headerName: 'Price', minWidth: 80, flex: 0.5 },
        { field: 'stock', headerName: 'Stock', minWidth: 90, flex: 0.4 },
        { field: 'soldOut', headerName: 'Sold Out', minWidth: 80, flex: 0.3, align: 'left' },
        {
            field: ' ',
            headerName: 'Preview',
            minWidth: 70,
            flex: 0.3,
            align: 'center',

            renderCell: (params) => {
                return (<>
                    <Link to={`/products/${params.row.id}/?isEvent=true`} className="w-full h-full flex justify-end items-center pr-4 cursor-pointer">
                        <IoEyeOutline
                            size={22}
                         />
                    </Link>
                </>)
            }
        }
    ]
    if (loading) {
        return (
            <OrderAnimation />
        )
    }
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
export default AdminAllEvents
