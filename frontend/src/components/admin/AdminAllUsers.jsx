import { DataGrid } from '@mui/x-data-grid'
import { IoEyeOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { deleteUserAction, getAllUsersAction } from '../../redux/actions/user';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import OrderAnimation from '../../assets/OrderAnimation'

function AdminAllUsers(params) {
    const [isDelete, setIsDelete] = useState(false)
    const [userId, setUserId] = useState(null)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllUsersAction())
    }, [dispatch])
    const users = useSelector(state => state.user.allUsers)
    const loading = useSelector(state=> state.user.loading)

    const rows = users && users.map((item) => ({
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
        joining: item.createdAt.slice(0, 10),

    }))
    const columns = [
        { field: 'id', headerName: 'User ID', minWidth: 90, flex: 0.6 },
        { field: 'name', headerName: 'Name', minWidth: 100, flex: 0.6 },
        { field: 'email', headerName: 'Email', minWidth: 80, flex: 0.5 },
        { field: 'role', headerName: 'Role', minWidth: 90, flex: 0.4 },
        { field: 'joining', headerName: 'Joining Date', minWidth: 80, flex: 0.3, align: 'left' },
        {
            field: ' ',
            headerName: 'Delete User',
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
                                setUserId(params.row.id)
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
                isDelete && <DeletePopup setIsDelete={setIsDelete} userId={userId}/>
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
export default AdminAllUsers




function DeletePopup({ setIsDelete, userId }) {
    const dispatch = useDispatch()
    // useEffect(()=>{console.log(userId)},[]
    async function handleDelete() {
        const result = await dispatch(deleteUserAction(userId))
        // console.log(result)
        if(result.success){
            setIsDelete(false)
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
                    >Do you want to delete this user?</p>
                    <div className='mt-4'>
                        <button className='bg-black text-white px-6 py-2 m-2 rounded-md cursor-pointer' onClick={() => setIsDelete(false)}>cancel</button>
                        <button className='bg-black text-white px-6 py-2 m-2 rounded-md cursor-pointer' onClick={handleDelete}>confirm</button>
                    </div>
                </div>

            </div>
        </div>
    )
}