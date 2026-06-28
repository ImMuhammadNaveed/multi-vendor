import { useState } from "react"
import ShippingDetails from "../components/order/ShippingDetails"
import Payment from "../components/order/Payment"
import Success from "../components/order/Success"
import axios from "axios"
import {generalContext} from '../context/Context'
import { useContext } from "react"
import { cartContext } from "../context/CartContext"

function Shipping() {
    const [stage, setStage] = useState(1)
    

    
    return (
        <div className="w-full flex flex-col gap-8 items-center bg-[#F5F6FB] py-8">
            <div className="flex justify-center items-center">
                <p className={`bg-red-600 text-white px-6 py-1 rounded-full`}>1.Shipping</p>
                <div className={`w-16 h-1 bg-red-100 ${stage===2 || stage===3?"bg-red-600":""}`}></div>
                <p className={`text-red-600 bg-red-100 px-6 py-1 rounded-full ${stage === 2 || stage===3 ? "bg-red-600 text-white" : ""}`}>2.Payment</p>
                <div className={`w-16 h-1 bg-red-100 ${stage===3?"bg-red-600":""}`}></div>
                <p className={`text-red-600 bg-red-100 px-6 py-1 rounded-full ${stage === 3 ? "bg-red-600 text-white" : ""}`}>3.Success</p>
            </div>
            {
                stage === 1
                    ? <ShippingDetails />
                    : stage === 2
                        ? <Payment />
                        : stage === 3
                            ? <Success />
                            : ""
            }
            

        </div>
    )
}



export default Shipping