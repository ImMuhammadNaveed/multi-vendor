import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { getUserOrders } from '../redux/thunks/order'
import TrackOrderAnimation from '../assets/TrackOrderAnimation'

function TrackOrder() {
    const { id } = useParams()
    const dispatch = useDispatch()
    useEffect(() => { dispatch(getUserOrders()) }, [])

    const orders = useSelector(state=> state.order.userOrders)
    const loading = useSelector(state => state.order.userOrdersLoading)
    const reqOrder = orders && orders.find((order) => order._id === id)

    if (loading) {
        return <TrackOrderAnimation />
    }

    if (!reqOrder) {
        return (
            <div className="h-60 flex items-center justify-center">
                <h1 className="text-xl font-[600]">Order not found!</h1>
            </div>
        )
    }

    if (reqOrder && reqOrder.status === 'Processing') {
        return (
            <div className="h-60 flex items-center justify-center">
                <h1 className="text-xl font-[600]">Your Order is Processing in shop!</h1>
            </div>

        )
    } else if (reqOrder && reqOrder.status === 'Transfered to delivery partner') {
        return (
            <div className="h-60 flex items-center justify-center">
                <h1 className="text-xl font-[600]">Your Order is on the way for delivery!</h1>
            </div>

        )
    } else if (reqOrder && reqOrder.status === 'Shipping') {
        return (
            <div className="h-60 flex items-center justify-center">
                <h1 className="text-xl font-[600]">Your Order is coming with our delivery partner!</h1>
            </div>

        )
    } else if (reqOrder && reqOrder.status === 'Received') {
        return (
            <div className="h-60 flex items-center justify-center">
                <h1 className="text-xl font-[600]">Your Order is in your city. Our delivery partner will deliver it!</h1>
            </div>

        )
    } else if (reqOrder && reqOrder.status === 'On the way') {
        return (
            <div className="h-60 flex items-center justify-center">
                <h1 className="text-xl font-[600]">Our delivery man is going to deliver your order!</h1>
            </div>

        )
    } else if (reqOrder && reqOrder.status === 'Delivered') {
        return (
            <div className="h-60 flex items-center justify-center">
                <h1 className="text-xl font-[600]">Your Order is delivered!</h1>
            </div>

        )
    } else if (reqOrder && reqOrder.status === 'Processing refund') {
        return (
            <div className="h-60 flex items-center justify-center">
                <h1 className="text-xl font-[600]">Your refund is processing!</h1>
            </div>

        )
    } else if (reqOrder && reqOrder.status === 'Refund success') {
        return (
            <div className="h-60 flex items-center justify-center">
                <h1 className="text-xl font-[600]">Your refund is succeed!</h1>
            </div>

        )
    } else {
        null
    }
}



export default TrackOrder
