import { useState } from "react"
import { categoriesData } from "../../static/data"
import { MdAddCircleOutline } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineDelete } from "react-icons/ai";
import axios from 'axios'
import { backend_url } from "../../server";
import { DataGrid } from '@mui/x-data-grid'
import { useEffect } from "react";
import { toast } from "react-toastify";
import OrderAnimation from "../../assets/OrderAnimation";
import LoadingButton from "../loading/LoadingButton";
import ButtonSpinner from "../loading/ButtonSpinner";

function CreateCoupon() {
    const [open, setOpen] = useState(false)

    const [coupons, setCoupons] = useState(null)

    const [name, setName] = useState("")
    const [percentage, setPercentage] = useState("")
    const [minAmount, setMinAmount] = useState("")
    const [maxAmount, setMaxAmount] = useState("")
    const [product, setProduct] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const [deletingCouponId, setDeletingCouponId] = useState(null)

    async function handleSubmittion(e) {
        e.preventDefault()
        const form = new FormData()
        const newCoupon = {
            name: name,
            value: percentage,
            minAmount: minAmount,
            maxAmount: maxAmount,
            product: product
        }
        try {
            setSubmitting(true)
            const { data } = await axios.post(backend_url + "/api/coupon/create-coupon", newCoupon, { withCredentials: true })
            console.log(data)
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false)
        }
    }

    async function handleDeleteCoupon(id) {
        try {
            setDeletingCouponId(id)
            const { data } = await axios.delete(backend_url + `/api/coupon/delete-coupon/${id}`, { withCredentials: true })
            if (data.success) {
                setCoupons(coupons.filter((c) => c._id !== data.deletedCoupon._id))
            }
        } catch (error) {
            toast.error(error.response?.data?.message)
        } finally {
            setDeletingCouponId(null)
        }
    }

    useEffect(() => { handleGetShopAllCoupons() }, [])
    const [loading, setLoading] = useState(true)
    async function handleGetShopAllCoupons() {
        try {
            setLoading(true)
            const { data } = await axios.get(backend_url + "/api/coupon/shop-all-coupons", { withCredentials: true })
            console.log(data)
            if (data.success) {
                setCoupons(data.data)
            }
        } catch (error) {
            console.log(error)
        } finally{
            setLoading(false)
        }
    }
    const rows = coupons && coupons.map((item) => ({
        id: item._id,
        name: item.name,
        price: item.value,
    }))
    const columns = [
        { field: 'id', headerName: 'Coupon ID', minWidth: 90, flex: 0.6 },
        { field: 'name', headerName: 'Name', minWidth: 80, flex: 0.3 },
        { field: 'price', headerName: 'Price', minWidth: 80, flex: 0.5 },
        {
            field: '  ',
            headerName: 'Delete Coupon',
            minWidth: 70,
            flex: 0.3,
            align: 'right',

            renderCell: (params) => {
                return (<>
                    <div className="w-full h-full flex justify-end items-center pr-4">
                        <button
                            className="cursor-pointer disabled:opacity-60"
                            onClick={() => handleDeleteCoupon(params.row.id)}
                            disabled={deletingCouponId === params.row.id}
                        >
                            {deletingCouponId === params.row.id
                                ? <ButtonSpinner size={20} />
                                : <AiOutlineDelete size={22} />}
                        </button>

                    </div>
                </>)
            }
        }
    ]
    return (
        <>
            <div className="w-full">
                <div className="flex justify-between items-center my-4 mx-4">
                    <p className='text-2xl font-semibold'>All Coupons</p>
                    <button
                        onClick={() => setOpen(true)}
                        className='bg-black text-white px-6 py-2 rounded-md cursor-pointer'
                    >Create new coupon
                    </button>
                </div>
                {loading
                ?<OrderAnimation/>
                :<div style={{ width: '100%', height: 400 }}>
                    <DataGrid
                        className="text-right"
                        columns={columns}
                        rows={rows}
                        pageSize={10}
                        autoHeight
                    />
                </div>
                }
                
            </div>

            {
                open &&
                <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
                    <form
                        className="w-120 bg-white mx-auto p-3 h-fit overflow-y-auto scrollbar-hide rounded-md"
                        onSubmit={handleSubmittion}
                    >
                        <div className="flex justify-end">
                            <RxCross1
                                onClick={() => setOpen(false)}
                                className="cursor-pointer"
                            />
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-semibold mb-2">Create Coupon</p>
                        </div>
                        <div className="mb-4">
                            <p className="mb-1 text-sm font-semibold">Name <span className="text-red-500">*</span></p>
                            <input
                                type="text"
                                className="border border-gray-200 rounded-sm w-full p-1 focus:outline-none text-sm"
                                placeholder="Enter your coupon name..."
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <p className="mb-1 text-sm font-semibold">Discount Percentage <span className="text-red-500">*</span></p>
                            <input
                                type="number"
                                className="border border-gray-200 rounded-sm w-full p-1 focus:outline-none text-sm"
                                placeholder="Enter your coupon percentage..."
                                value={percentage}
                                onChange={(e) => setPercentage(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <p className="mb-1 text-sm font-semibold">Min Amount</p>
                            <input
                                type="number"
                                className="border border-gray-200 rounded-sm w-full p-1 focus:outline-none text-sm"
                                placeholder="Enter your coupon min amount..."
                                value={minAmount}
                                onChange={(e) => setMinAmount(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <p className="mb-1 text-sm font-semibold">Max Amount</p>
                            <input
                                type="number"
                                className="border border-gray-200 rounded-sm w-full p-1 focus:outline-none text-sm"
                                placeholder="Enter your coupon max amount..."
                                value={maxAmount}
                                onChange={(e) => setMaxAmount(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <p className="mb-1 text-sm font-semibold">Selected Product</p>
                            <select
                                name=""
                                id=""
                                className="border border-gray-200 rounded-sm w-full p-1 focus:outline-none text-sm"
                                value={product}
                                onChange={(e) => setProduct(e.target.value)}
                            >
                                <option value="" disabled>
                                    Select a product
                                </option>
                                <option value="abc">abc</option>
                                <option value="def">def</option>
                            </select>
                        </div>
                        <div >
                            <LoadingButton
                                loading={submitting}
                                type="submit"
                                className="border border-gray-200 rounded-sm w-full p-1 focus:outline-none text-sm cursor-pointer"
                            >
                                Create
                            </LoadingButton>
                        </div>
                    </form>
                </div>
            }


        </>
    )
}


export default CreateCoupon
