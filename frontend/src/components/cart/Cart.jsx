import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
} from "../../redux/slices/cart";

import { getImageUrl } from "../../utils/image";


function Cart({ setOpenCart }) {
    const cart = useSelector((state) => state.cart.cart);

    return (
        <div className="fixed inset-0 bg-black/40 z-60">

            <div className="fixed z-51 lg:w-[25%] w-[70%] bg-white top-0 right-0 h-screen overflow-y-scroll scrollbar-hide">

                {/* Close Button */}
                <div className="flex justify-end mr-3 mt-3">
                    <RxCross1
                        onClick={() => setOpenCart(false)}
                        size={25}
                        className="cursor-pointer font-bold"
                    />
                </div>

                {/* Cart Header */}
                <p className="flex text-xl font-semibold items-center my-8 ml-3">
                    <IoBagHandleOutline
                        size={25}
                        className="mr-2"
                    />

                    {cart?.length || 0} items
                </p>

                <hr className="text-[#E5E7EB]" />

                {/* Cart Items */}
                {cart?.map((item) => (
                    <CartItem
                        item={item}
                        key={item.product}
                    />
                ))}

                {/* Checkout */}
                <div className="flex justify-center my-4 mx-2">
                    <Link
                        className="bg-red-500 text-white font-bold px-4 py-2 rounded-md w-full text-center"
                        to="/shipping"
                        onClick={() => setOpenCart(false)}
                    >
                        Check Out
                    </Link>
                </div>

            </div>
        </div>
    );
}


function CartItem({ item }) {
    const dispatch = useDispatch();

    return (
        <div>

            <div className="flex lg:flex-row flex-col items-center justify-between pt-3 pl-3 pb-3">

                {/* Quantity Controls */}
                <div className="flex lg:flex-col flex-row gap-1 items-center">

                    <button
                        onClick={() =>
                            dispatch(increaseQuantity(item.product._id))
                        }
                        className="p-1 rounded-full bg-red-500 text-white cursor-pointer"
                    >
                        <FaPlus size={10} />
                    </button>

                    <p>{item.quantity}</p>

                    <button
                        onClick={() =>
                            dispatch(decreaseQuantity(item.product._id))
                        }
                        className="p-1 rounded-full bg-[#E4E5E7] text-[#7D879C] cursor-pointer"
                    >
                        <FaMinus size={10} />
                    </button>

                </div>


                {/* Product Image */}
                <div className="w-16">

                    <img
                        src={getImageUrl(item.product.images[0])}
                        className="lg:w-70 w-50 p-2 object-contain"
                        alt={item.product.name || "Product"}
                    />

                </div>


                {/* Product Details */}
                <div className="lg:w-50 w-full">

                    <p className="text-sm">
                        {item.product.name}
                    </p>

                    <p className="font-normal text-[#7D7D7D] text-md">
                        ${item.product.price} × {item.quantity}
                    </p>

                    <p className="font-bold text-[#D02222] mt-1">
                        US ${item.product.price * item.quantity}
                    </p>

                </div>


                {/* Remove Item */}
                <div className="w-6">

                    <RxCross1
                        className="w-full cursor-pointer"
                        onClick={() =>
                            dispatch(removeFromCart(item.product._id))
                        }
                    />

                </div>

            </div>

            <hr className="text-[#E5E7EB]" />

        </div>
    );
}


export default Cart;
