import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { DataGrid } from "@mui/x-data-grid"
import axios from "axios"
import { backend_url } from "../../server"
import { GiConfirmed } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";



function AdminWithdrawRequest(params) {
    const [isDelete, setIsDelete] = useState(false)
    const [withdraw, setWithdraw] = useState(null)
    const [requests, setRequests] = useState(null)
    // const seller = useSelector(state => state.shop.seller)


    async function getAllRequests() {
        try {
            const { data } = await axios.get(backend_url + "/api/withdraw/get-all-withdraw-requests", { withCredentials: true })
            if (data.success) {
                setRequests(data.allWithdraws)
            }
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        getAllRequests()
    }, [])


    const rows = requests && requests.map((item) => ({
        id: item._id,
        shop: item.seller.name,
        shopId: item.seller._id,
        amount: item.amount,
        status: item.status,
        request: item.createdAt.slice(0, 10),
    }))
    const columns = [
        { field: 'id', headerName: 'Withdraw ID', minWidth: 90, flex: 0.6 },
        { field: 'shop', headerName: 'Shop Name', minWidth: 80, flex: 0.3 },
        { field: 'shopId', headerName: 'Shop ID', minWidth: 80, flex: 0.5 },
        { field: 'amount', headerName: 'Amount', minWidth: 50, flex: 0.2 },
        { field: 'status', headerName: 'Status', minWidth: 80, flex: 0.3, align: 'left' },
        { field: 'request', headerName: 'Request', minWidth: 80, flex: 0.3, align: 'left' },
        {
            field: ' ',
            headerName: 'Update',
            minWidth: 70,
            flex: 0.3,
            align: 'right',

            renderCell: (params) => {
                return (
                    <>
                        {params.row.status === "Processing" && (
                            <button className="w-full h-full flex justify-end items-center pr-4 cursor-pointer">
                                <GiConfirmed
                                    size={22}
                                    onClick={() => {
                                        setIsDelete(true);
                                        setWithdraw(params.row);
                                    }}
                                />
                            </button>
                        )}
                    </>
                );
            }
        }
    ]
    return requests && (
        <div style={{ width: '100%', height: 400 }}>
            {
                isDelete && <DeletePopup setIsDelete={setIsDelete} withdraw={withdraw} getAllRequests={getAllRequests} />
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

export default AdminWithdrawRequest












function DeletePopup({ setIsDelete, withdraw, getAllRequests }) {
    useEffect(()=>{console.log(withdraw)},[])
    async function handleUpdateRequest(withdraw) {
        try {
            console.log(withdraw.id)
            const { data } = await axios.put(backend_url + `/api/withdraw/update-withdraw-request/${withdraw.id}`, { sellerId: withdraw.shopId }, { withCredentials: true })
            if (data.success) {
                getAllRequests()
                setIsDelete(false)
                alert(data.message)
            }
        } catch (error) {
            console.log(error)
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
                    >Do you want to confirm this withdraw?</p>
                    <div className='mt-4'>
                        <button className='bg-black text-white px-6 py-2 m-2 rounded-md cursor-pointer' onClick={() => setIsDelete(false)}>cancel</button>
                        <button className='bg-black text-white px-6 py-2 m-2 rounded-md cursor-pointer' onClick={()=>handleUpdateRequest(withdraw)}>confirm</button>
                    </div>
                </div>

            </div>
        </div>
    )
}