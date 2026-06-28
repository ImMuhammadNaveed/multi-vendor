import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import cart_pic from '../../static/cart-item.png'
import { Link } from 'react-router-dom'
function Cart({ setOpenCart }) {
    // const data = [
    //     {
    //         image: cart_pic,
    //         name: "Iphone 14 pro max 256 gb ssd and 8 gb ram silver colour",
    //         price: 699
    //     },
    //     {
    //         image: cart_pic,
    //         name: "Iphone 14 pro max 256 gb ssd and 8 gb ram silver colour",
    //         price: 999
    //     },
    //     {
    //         image: cart_pic,
    //         name: "Iphone 14 pro max 256 gb ssd and 8 gb ram silver colour",
    //         price: 245
    //     }
    // ]
    const { cart } = useContext(cartContext)
    return (
        <div className="fixed inset-0 bg-black/40 z-60">
            <div className="fixed z-51 w-[25%] bg-white top-0 right-0 h-screen overflow-y-scroll scrollbar-hide">
                <div className="flex justify-end mr-3 mt-3">
                    <RxCross1
                        onClick={() => { setOpenCart(false) }}
                        size={25}
                        className="cursor-pointer font-bold "
                    />
                </div>

                <p className="flex text-xl font-semibold items-center my-8 ml-3">
                    <IoBagHandleOutline size={25} className="mr-2" />{cart.length} items
                </p>
                <hr className="text-[#E5E7EB]" />
                {
                    cart.map((item) =>
                        <CartItem
                            item={item}
                            key={item.product._id}
                        />
                    )
                }
                <div className="flex justify-center my-4 mx-2">
                    <Link
                        className='bg-red-500 text-white font-bold px-4 py-2 rounded-md w-full text-center'
                        to='/shipping'
                    >Check Out</Link>
                </div>

            </div>
        </div>

    )
}
export default Cart





import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { useContext, useState } from "react";
import { cartContext } from "../../context/CartContext";
import { generalContext } from "../../context/Context"

function CartItem({ item }) {
    const [quantity, setQuantity] = useState(1)
    const { backend_url } = useContext(generalContext)
    const { removeFromCart, increaseQuantity, decreaseQuantity } = useContext(cartContext)
    return (
        <div>
            <div className="flex items-center justify-between pt-3 pl-3 pb-3">
                <div className="flex flex-col gap-1 items-center">
                    <button
                        onClick={() => increaseQuantity(item.product._id)}
                        className="p-1 rounded-full bg-red-500 text-white"
                    ><FaPlus size={10} /></button>
                    <p>{item.quantity}</p>
                    <button
                        onClick={() => decreaseQuantity(item.product._id)}
                        className="p-1 rounded-full bg-[#E4E5E7] text-[#7D879C]"><FaMinus size={10} /></button>
                </div>
                <div className="w-16">
                    <img
                        src={`${backend_url}/uploads/` + item.product.images[0]}
                        className="w-full object-contain"
                        alt="" />
                </div>
                <div>
                    <p className="text-sm">{item.product.name}</p>
                    <p className="font-normal text-[#7D7D7D] text-md">${item.product.price} * {item.quantity}</p>
                    <p className="font-bold text-[#D02222] mt-1">US ${item.product.price * item.quantity}</p>
                </div>
                <div className="w-6">
                    <RxCross1
                        // size={20}
                        className="w-full cursor-pointer"
                        onClick={() => removeFromCart(item.product)}
                    />
                </div>

            </div>
            <hr className="text-[#E5E7EB]" />
        </div>

    )
}
