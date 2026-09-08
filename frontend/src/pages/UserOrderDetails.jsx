import Header from "../components/header/Header"
import { Link, useNavigate, useParams } from "react-router-dom"
import { IoBag } from "react-icons/io5";
import axios from "axios";
import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { backend_url } from "../server";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../redux/thunks/user";
import { toast } from "react-toastify";
import OrderDetailsAnimation from '../assets/OrderDetailsAnimation'
import LoadingButton from '../components/loading/LoadingButton'

function UserOrderDetails() {
    const { id } = useParams()
    const [data, setData] = useState(null)
    const [openReview, setOpenReview] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")
    const [loading, setLoading] = useState(true)
    const [requestingRefund, setRequestingRefund] = useState(false)
    const [sendingMessage, setSendingMessage] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

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

    async function processRefund() {
        try {
            setRequestingRefund(true)
            const { data } = await axios.post(backend_url + `/api/order/process-refund/${id}`, { withCredentials: true })
            if (data.success) {
                toast.error(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            setRequestingRefund(false)
        }
    }

    async function handleSendMessage() {
        try {
            setSendingMessage(true)
            await dispatch(sendMessage({userData: data.user, data: data.cart[0].product, navigate: navigate}))
        } finally {
            setSendingMessage(false)
        }
    }

    return(
        <>
            {openReview && (
                <ReviewForm
                    product={selectedProduct}
                    setOpenReview={setOpenReview}
                    rating={rating}
                    setRating={setRating}
                    comment={comment}
                    setComment={setComment}
                    data={data}
                    getOrderDetails={getOrderDetails}
                />
            )}
            <Header />
            {loading
                ? <OrderDetailsAnimation />
                : data&&<div className="w-[90%] mx-auto my-8">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <IoBag
                                size={35}
                                color="#DB5079"
                            />
                            <p className="text-xl font-bold">Order Details</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between my-6">
                        <p className="text-gray-500">Order ID: #{data._id}</p>
                        <p className="text-gray-500">Placed on: {data.createdAt.split("T")[0]}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-4 flex-1">
                            {
                                data.cart.map((item) => (
                                    <div key={item._id} className="flex gap-2 justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <img
                                                src={`${backend_url}/uploads/` + item.product.images[0]}
                                                alt=""
                                                className="w-12 bg-white"
                                            />
                                            <div>
                                                <p className="lg:w-full w-48">{item.product.name}</p>
                                                <p className="text-gray-500">{item.quantity} * ${item.product.price}</p>
                                            </div>
                                        </div>
                                        <div>
                                            {
                                                data.status === "Delivered" && !item.isReviewed
                                                    ? <button
                                                        className=" bg-black text-white px-4 py-2 rounded-lg cursor-pointer"
                                                        onClick={() => {
                                                            setSelectedProduct(item.product)
                                                            setOpenReview(true)
                                                        }}>
                                                        Write review
                                                    </button>
                                                    : ""
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

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
                            <p>Status: {data.status ? data.status : "not paid"}</p>
                            <LoadingButton
                                loading={requestingRefund}
                                className="bg-black text-white px-6 py-2 rounded-lg absolute my-8 cursor-pointer"
                                onClick={processRefund}
                            >
                                Refund
                            </LoadingButton>
                        </div>
                    </div>
                    <LoadingButton
                        loading={sendingMessage}
                        onClick={handleSendMessage}
                        className="bg-black text-white px-6 py-2 rounded-lg absolute my-8 cursor-pointer">
                        Send Message
                    </LoadingButton>
                </div>
            }

        </>
    )
}


export default UserOrderDetails






function ReviewForm({
    product,
    setOpenReview,
    rating,
    setRating,
    comment,
    setComment,
    data,
    getOrderDetails
}) {
    const userData = useSelector(state => state.user.user)
    const [submitting, setSubmitting] = useState(false)
    async function addReview() {
        try {
            if (!rating) return toast.error("Give rating first")
            setSubmitting(true)
            const res = await axios.post(
                backend_url + "/api/product/add-product-review",
                {
                    productId: product._id,
                    rating,
                    comment,
                    user: userData,
                    orderId: data._id
                },
                { withCredentials: true }
            )
            if (res.data.success) {
                getOrderDetails()
                toast.success(res.data.message)
            } else {
                toast.error(res.data.message)
            }
            setOpenReview(false)
            setRating(0)
            setComment("")

        } catch (error) {
            console.log(error.response)
        } finally {
            setSubmitting(false)
        }
    }
    return (
        <div className="w-full h-full bg-black/20 absolute flex justify-center items-center">
            <div className="z-60 w-[50%] bg-white p-3 rounded-md z-50">
                <div className="flex justify-end">
                    <RxCross1
                        className="cursor-pointer"
                        size={25}
                        onClick={() => setOpenReview(false)}
                    />
                </div>
                <p className="text-center text-2xl font-semibold">Give a Review</p>
                <div className="flex items-center gap-2 my-6">
                    <img
                        src={backend_url + `/uploads/${product.images[0]}`}
                        alt=""
                        className="w-10"
                    />
                    <p>{product.name}</p>
                </div>
                <div>
                    <p className="font-semibold">Give a Rating <span className="text-red-500">*</span></p>
                    <div className="flex">
                        {[1, 2, 3, 4, 5].map((i) =>
                            rating >= i ? (
                                <AiFillStar
                                    key={i}
                                    className="mr-1 cursor-pointer"
                                    color="rgb(246,186,0)"
                                    size={25}
                                    onClick={() => setRating(i)}
                                />
                            ) : (
                                <AiOutlineStar
                                    key={i}
                                    className="mr-1 cursor-pointer"
                                    color="rgb(246,186,0)"
                                    size={25}
                                    onClick={() => setRating(i)}
                                />
                            )
                        )}
                    </div>
                </div>
                <div>
                    <div className="my-2">
                        <p className="font-bold inline">Write a comment </p>
                        <span className="text-gray-400">(optional)</span>
                    </div>

                    <textarea
                        name=""
                        id=""
                        cols=""
                        rows="7"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="How was your product? Write your expressions about it!"
                        className="w-full border border-gray-300 p-1 focus:ouline-none"
                    ></textarea>
                </div>
                <LoadingButton
                    loading={submitting}
                    className="bg-black text-white py-2 px-8 rounded-lg cursor-pointer mt-1"
                    onClick={() => addReview(product)}
                >Submit</LoadingButton>
            </div>
        </div>
    )
}
