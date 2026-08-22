import {
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js"
import axios from "axios"
import { backend_url } from "../../server"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { useState } from "react"
import { setCart } from "../../redux/slices/cart"


function Payment({
    couponCode,
    stage, setStage,
    name, setName,
    email, setEmail,
    phoneNumber, setPhoneNumber,
    country, setCountry,
    city, setCity,
    addressType, setAddressType,
    zipCode, setZipCode,
    address1, setAddress1,
    address2, setAddress2
}) {
    const stripe = useStripe()
    const elements = useElements()
    const cart = useSelector(state => state.cart.cart)
    const userData = useSelector(state => state.user.user)
    const [paymentMethod, setPaymentMethod] = useState("card")
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    async function handleSubmit(e) {
        e.preventDefault()
        if (paymentMethod === 'card') {
            if (!stripe || !elements) {
                toast.error("Stripe is not ready yet")
                return
            }
            try {
                setLoading(true)
                const { data } = await axios.post(backend_url + "/api/payment/process-payment", { cart, couponCode }, { withCredentials: true })
                if (data.success) {
                    const result = await stripe.confirmCardPayment(data.clientSecret, {
                        payment_method: {
                            card: elements.getElement(CardNumberElement)
                        }
                    })
                    if (result.error) {
                        toast.error(result.error.message)
                    } else if (result.paymentIntent.status === 'succeeded') {
                        // toast.success("Payment successful!")
                        await placeOrder()
                    }

                }
            } catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        } else {
            try {
                setLoading(true)
                await placeOrder()
            } finally {
                setLoading(false)
            }
        }

    }

    async function placeOrder() {
        const shippingAddress = {
            zipCode,
            country,
            city,
            address1,
            address2
        }
        const paymentInfo = 'pending'
        try {
            const { data } = await axios.post(backend_url + "/api/order/create-order",
                { cart, shippingAddress, user: userData, paymentInfo, couponCode },
                { withCredentials: true }
            )
            if (data.success) {
                dispatch(setCart([]))
                localStorage.setItem(
                    `cart_${userData._id}`,
                    JSON.stringify([])
                )
                setStage(3)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const cardElementOptions = {
        style: {
            base: {
                fontSize: "16px",
                color: "#32325d",
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                "::placeholder": {
                    color: "#a0aec0",
                },
            },
            invalid: {
                color: "#fa755a",
            },
        },
    };
    return (
        <form onSubmit={handleSubmit} className="w-100">
            <div className="flex flex-col gap-6">
                <label>
                    <input type="radio" name="payment" value="card" className="mr-2"
                        onChange={() => setPaymentMethod("card")} />
                    Card
                </label>
                {paymentMethod === "card" && (
                    <div className=" space-y-3 w-full h-26">
                        <div className="border border-gray-300 rounded-md p-3 bg-white shadow-sm">
                            <CardNumberElement options={cardElementOptions} />
                        </div>
                        <div className="flex gap-3">
                            <div className="border border-gray-300 rounded-md p-3 bg-white shadow-sm flex-1">
                                <CardExpiryElement options={cardElementOptions} />
                            </div>
                            <div className="border border-gray-300 rounded-md p-3 bg-white shadow-sm flex-1">
                                <CardCvcElement options={cardElementOptions} />
                            </div>
                        </div>
                    </div>
                )}
                <label>
                    <input type="radio" name="payment" value="cod" className="mr-2"
                        onChange={() => setPaymentMethod("cod")} />
                    Cash on Delivery
                </label>
                {
                    paymentMethod === "cod" && <div className="bg-white p-4 flex items-center justify-center rounded-md h-26">
                        <p className="font-semibold text-lg">You will pay when your order will be delivered at your address</p>
                    </div>
                }
            </div>

            <div className="flex items-center justify-center h-20">
                <button
                    type="submit"
                    className={`py-2 px-8 bg-red-600 text-white rounded-full cursor-pointer disabled:opacity-50`}
                    disabled={loading}
                >{loading ? "Loading..." : "Proceed"}
                </button>
            </div>

        </form>
    )
}


export default Payment