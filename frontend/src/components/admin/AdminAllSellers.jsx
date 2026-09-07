import { DataGrid } from '@mui/x-data-grid'
import { IoEyeOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { deleteSeller, getAllSellers } from '../../redux/thunks/shop';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import OrderAnimation from '../../assets/OrderAnimation'
import LoadingButton from '../loading/LoadingButton'


function AdminAllSellers() {
    const [isDelete, setIsDelete] = useState(false)
    const [sellerId, setSellerId] = useState(null)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllSellers())
    }, [dispatch])
    const sellers = useSelector(state => state.shop.allSellers)
    const loading = useSelector(state => state.shop.allSellersLoading)
    const rows = sellers && sellers.map((item) => ({
        id: item._id,
        name: item.name,
        email: item.email,
        address: item.address,
        joining: item.createdAt.slice(0, 10),

    }))
    const columns = [
        { field: 'id', headerName: 'Seller ID', minWidth: 90, flex: 0.6 },
        { field: 'name', headerName: 'Name', minWidth: 80, flex: 0.3 },
        { field: 'email', headerName: 'Email', minWidth: 80, flex: 0.5 },
        { field: 'address', headerName: 'Address', minWidth: 130, flex: 0.7 },
        { field: 'joining', headerName: 'Joining Date', minWidth: 80, flex: 0.3, align: 'left' },
        {
            field: ' ',
            headerName: 'Preview Shop',
            minWidth: 70,
            flex: 0.3,
            align: 'right',
            renderCell: (params) => {
                return (<>
                    <Link to={`/shop/${params.row.id}`} className="w-full h-full flex justify-end items-center pr-4 cursor-pointer">
                        <IoEyeOutline size={22} />
                    </Link>
                </>)
            }
        },
        {
            field: '  ',
            headerName: 'Delete Shop',
            minWidth: 70,
            flex: 0.3,
            align: 'right',

            renderCell: (params) => {
                return (<>
                    <div className="w-full h-full flex justify-end items-center pr-4 cursor-pointer">
                        <AiOutlineDelete
                            size={22}
                            onClick={() => {
                                setIsDelete(true)
                                setSellerId(params.row.id)
                            }
                            } />
                    </div>
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
            {
                isDelete && <DeletePopup setIsDelete={setIsDelete} sellerId={sellerId}/>
            }
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
export default AdminAllSellers




function DeletePopup({ setIsDelete, sellerId }) {
    const dispatch = useDispatch()
    const [deleting, setDeleting] = useState(false)
    async function handleDelete() {
        try {
            setDeleting(true)
            await dispatch(deleteSeller(sellerId)).unwrap()
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
                    >Do you want to delete this shop/seller?</p>
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
