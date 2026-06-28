import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../context/UserContext";

function TrackOrder() {
    const { id } = useParams()
    const { getUserOrders, orders } = useContext(userContext)
    useEffect(() => { getUserOrders() }, [])

    const reqOrder = orders && orders.find((order) => order._id === id)

    useEffect(() => { console.log(reqOrder) }, [])

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