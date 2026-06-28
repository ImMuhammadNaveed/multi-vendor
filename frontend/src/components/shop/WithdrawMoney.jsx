import { useContext } from "react"
import { shopContext } from "../../context/ShopContext"
import { Link } from "react-router-dom"

function WithdrawMoney() {
    const { orders } = useContext(shopContext)
    const deliveredOrders = orders && orders.filter((order)=>order.status==="Delivered")
    const totalPrice = deliveredOrders && deliveredOrders.reduce((acc, item)=>acc+item.totalPrice,0)
    const serviceCharges = totalPrice&&totalPrice*0.1
    const availableBalance = totalPrice - serviceCharges
    return(
        <>
        <div className="flex flex-col justify-center items-center mx-auto">
            <p className="text-xl font-[600] mb-4">Available Balance: ${availableBalance}</p>
            <Link className='bg-black text-white py-2 px-6 rounded-md text-lg font-semibold'>Withdraw</Link>
        </div>
        </>
    )
}


export default WithdrawMoney