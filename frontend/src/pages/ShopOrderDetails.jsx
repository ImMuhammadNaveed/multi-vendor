import Header from "../components/shop/Header"
import { Link, useParams } from "react-router-dom"
import { IoBag } from "react-icons/io5";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { backend_url } from "../server";
import { getImageUrl } from "../utils/image";
import { toast } from "react-toastify";
import OrderDetailsAnimation from '../assets/OrderDetailsAnimation'
import LoadingButton from '../components/loading/LoadingButton'

function ShopOrderDetails() {
    const { id } = useParams()
    const [data, setData] = useState(null)
    const [status, setStatus] = useState('Processing')
    const [loading, setLoading] = useState(true)
    const [updatingStatus, setUpdatingStatus] = useState(false)

    async function getOrderDetails() {
        try {
            setLoading(true)
            const { data } = await axios.get(backend_url + `/api/order/order-details/${id}`, { withCredentials: true })
            if (data.success) {
                setData(data.data)
            }
        } catch (error) {
            console.log(error.response.data.message)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getOrderDetails()
    }, [id])

    async function updateStatus() {
        try {
            setUpdatingStatus(true)
            const { data } = await axios.post(backend_url + `/api/order/update-order-status/${id}`, { status: status }, { withCredentials: true })
            if(data.success){
                setData(data.orderData)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            setUpdatingStatus(false)
        }
    }
    const isRefundFlow =
        data?.status === "Processing refund" ||
        data?.status === "Refund Success";
    async function refundOrderUpdateHandler() {
        try {
            setUpdatingStatus(true)
            const { data } = await axios.post(backend_url + `/api/order/refund-success/${id}`, { status: status }, { withCredentials: true })
            if(data.success){
                toast.success(data.message)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            setUpdatingStatus(false)
        }
    }
    if(loading){
        return <OrderDetailsAnimation/>
    }
    return data && (
        <>
            <Header />
            <div className="w-[90%] mx-auto my-8">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <IoBag
                            size={35}
                            color="#DB5079"
                        />
                        <p className="text-xl font-bold">Order Details</p>
                    </div>
                    <Link
                        className="bg-[#F7D3E0] text-[#CA385C] px-6 py-2 rounded-md font-bold"
                    >Order List</Link>
                </div>
                <div className="flex items-center justify-between my-6">
                    <p className="text-gray-500">Order ID: #{data._id}</p>
                    <p className="text-gray-500">Placed on: {data.createdAt.split("T")[0]}</p>
                </div>
                <div className="flex flex-col gap-4">
                    {
                        data.cart.map((item) => (
                            <div key={item._id} className="flex items-center gap-2">
                                <img
                                    src={getImageUrl(item.product.images[0])}
                                    alt=""
                                    className="w-12 bg-white"
                                />
                                <div>
                                    <p>{item.product.name}</p>
                                    <p className="text-gray-500">{item.quantity} * ${item.product.price}</p>
                                </div>

                            </div>

                        ))
                    }
                </div>
                <hr className="text-gray-300 my-4" />
                <div className="flex justify-end mb-8">
                    <p>Total Price: <span className="font-bold">${data.totalPrice}</span></p>
                </div>
                <div className="flex justify-between">
                    <div>
                        <p className="text-lg font-semibold">Shipping Address:</p>
                        <p>{data.shippingAddress.address1}</p>
                        <p>{data.shippingAddress.country}</p>
                        <p>{data.shippingAddress.city}</p>
                        <p>{data.user.phoneNumber}</p>
                    </div>
                    <div>
                        <p className="text-lg font-semibold">Payment Info:</p>
                        <p>Status: {data.status}</p>
                    </div>
                </div>
                <p className="text-lg font-semibold mt-8">Order Status:</p>
                {
                    data.status !== "Processing refund" && data?.status !== "Refund Success" && (
                        <select
                            name=""
                            id=""
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="focus:outline-none border border-gray-300 rounded-md h-8 my-2">
                            {
                                [
                                    'Processing',
                                    'Transferred to delivery partner',
                                    'Shipping',
                                    'Received',
                                    'On the way',
                                    'Delivered'
                                ].map((item) => (
                                    <option value={item} key={item}>{item}</option>
                                ))
                            }
                        </select>
                    )
                }
                {
                    (data.status === "Processing refund" || data?.status === "Refund Success") && (
                        <select
                            name=""
                            id=""
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="focus:outline-none border border-gray-300 rounded-md h-8 my-2">
                            {
                                [
                                    'Processing refund',
                                    'Refund success'
                                ].map((item) => (
                                    <option value={item} key={item}>{item}</option>
                                ))
                            }
                        </select>
                    )
                }
                <br />
                <LoadingButton
                    loading={updatingStatus}
                    className="bg-[#F7D3E0] text-[#CA385C] px-6 py-2 rounded-md font-bold cursor-pointer mt-2"
                    onClick={isRefundFlow ? refundOrderUpdateHandler : updateStatus}
                >
                    Update Status
                </LoadingButton>
            </div>
        </>
    )
}


export default ShopOrderDetails
