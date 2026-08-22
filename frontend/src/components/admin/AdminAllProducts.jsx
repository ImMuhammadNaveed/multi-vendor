import { DataGrid } from '@mui/x-data-grid'
import { IoEyeOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { deleteProductAction, getAllProductsAction } from '../../redux/actions/product';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function AdminAllProducts(params) {
    const [isDelete, setIsDelete] = useState(false)
    const [productId, setProductId] = useState(null)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllProductsAction())
    }, [dispatch])
    const products = useSelector(state => state.product.allProducts)

    const rows = products && products.map((item) => ({
        id: item._id,
        name: item.name,
        price: item.price,
        stock: item.stock,
        soldOut: item.soldOut,

    }))
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
            align: 'right',

            renderCell: (params) => {
                return (<>
                    <Link to={`/products/${params.row.id}`} className="w-full h-full flex justify-end items-center pr-4 cursor-pointer">
                        <IoEyeOutline
                            size={22}

                         />
                    </Link>
                </>)
            }
        },
        {
            field: '  ',
            headerName: 'Delete Product',
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
                                setProductId(params.row.id)
                            }
                            } />
                    </div>
                </>)
            }
        }
    ]
    return (
        <div style={{ width: '100%', height: 400 }}>
            {
                isDelete && <DeletePopup setIsDelete={setIsDelete} productId={productId}/>
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
export default AdminAllProducts




function DeletePopup({ setIsDelete, productId }) {
    const dispatch = useDispatch()
    // useEffect(()=>{console.log(userId)},[]
    async function handleDelete() {
        const result = await dispatch(deleteProductAction(productId))
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
                    >Do you want to delete this product?</p>
                    <div className='mt-4'>
                        <button className='bg-black text-white px-6 py-2 m-2 rounded-md cursor-pointer' onClick={() => setIsDelete(false)}>cancel</button>
                        <button className='bg-black text-white px-6 py-2 m-2 rounded-md cursor-pointer' onClick={handleDelete}>confirm</button>
                    </div>
                </div>

            </div>
        </div>
    )
}