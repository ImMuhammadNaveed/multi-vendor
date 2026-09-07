import { useEffect, useState } from "react"
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getShopEvents, deleteEvent } from "../../redux/thunks/event";
import OrderAnimation from '../../assets/OrderAnimation'
import LoadingButton from '../loading/LoadingButton'

function AllEvents() {
    const [isDelete, setIsDelete] = useState(false)
    const [eventId, setEventId] = useState(null)
    const sellerData = useSelector(state => state.shop.seller)
    const shopEvents = useSelector(state => state.event.shopEvents)
    const loading = useSelector(state => state.event.shopEventsLoading)
    const dispatch = useDispatch()

    useEffect(() => {
        if (sellerData?._id) {
            dispatch(getShopEvents(sellerData._id))
        }
    }, [sellerData])


    const cols = [
        { field: "id", headerName: "Event Id", minWidth: 150, flex: 0.9 },
        { field: "name", headerName: "Name", minWidth: 180, flex: 0.9 },
        { field: "stock", headerName: "Stock", type: "number", minWidth: 80, flex: 0.5 },
        { field: "sold", headerName: "Sold Out", type: "number", minWidth: 130, flex: 0.5 },
        {
            field: "preview", headerName: "", minWidth: 50, flex: 0.5, type: "number",
            renderCell: (params) => {
                const d = params.row.name;
                const event_name = d.replace(' ', '-')
                return (
                    <>
                        <Link to={`/products/${params.row.id}?isEvent=true`} className="h-full flex justify-center items-center">
                            <AiOutlineEye size={20} />
                        </Link>
                    </>
                )
            }
        },
        {
            field: "delete", headerName: "", minWidth: 50, flex: 0.5, type: "number",
            renderCell: (params) => {
                return (<>
                    <div className="w-full h-full flex justify-end items-center pr-4 cursor-pointer">
                        <AiOutlineDelete
                            size={22}
                            onClick={() => {
                                setIsDelete(true)
                                setEventId(params.row.id)
                            }
                            } />
                    </div>
                </>)
            }
        },

    ]
    const rows = shopEvents && shopEvents.map((item) => ({
        id: item._id,
        name: item.name,
        stock: item.stock,
        sold: item.soldOut
    }))
    if (loading) {
        return <OrderAnimation />
    }
    return (
        <div style={{ width: '100%', height: 400 }}>
            {
                isDelete && <DeletePopup setIsDelete={setIsDelete} eventId={eventId} />
            }
            <DataGrid
                className="text-right"
                columns={cols}
                rows={rows}
                pageSize={10}
                autoHeight
            />
        </div>
    )
}

export default AllEvents



function DeletePopup({ setIsDelete, eventId }) {
    const dispatch = useDispatch()
    const [deleting, setDeleting] = useState(false)
    async function handleDelete() {
        try {
            setDeleting(true)
            await dispatch(deleteEvent(eventId)).unwrap()
            setIsDelete(false)
        } finally {
            setDeleting(false)
        }
    }
    return (
        <div className='fixed inset-0 bg-black/30 z-50 flex items-center justify-center'>
            <div className='bg-white w-100 p-2 rounded-sm'>
                <div className='flex justify-end cursor-pointer'>
                    <RxCross1
                        size={20}
                        onClick={() => setIsDelete(false)}
                    />
                </div>
                <div className='text-center'>
                    <p
                        className='text-2xl font-semibold'
                    >Do you want to delete this event?</p>
                    <div className='mt-4'>
                        <button className='bg-black text-white px-6 py-2 m-2 rounded-md cursor-pointer' onClick={() => setIsDelete(false)}>cancel</button>
                        <LoadingButton
                            loading={deleting}
                            className='bg-black text-white px-6 py-2 m-2 rounded-md cursor-pointer'
                            onClick={handleDelete}
                        >confirm</LoadingButton>
                    </div>
                </div>

            </div>
        </div>
    )
}
