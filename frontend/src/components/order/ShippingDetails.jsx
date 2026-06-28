import { useEffect, useState } from "react"
import { Country, State, City } from 'country-state-city'
import { useContext } from "react"
import { userContext } from '../../context/UserContext'
import { cartContext } from '../../context/CartContext'
import axios from "axios"

function ShippingDetails() {
    const { backend_url } = useContext(userContext)
    const { cart } = useContext(cartContext)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [country, setCountry] = useState("")
    const [city, setCity] = useState("")
    const [addressType, setAddressType] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')

    const { userData } = useContext(userContext)
    useEffect(() => {
        setName(userData.name || "")
        setEmail(userData.email || "")
        setPhoneNumber(userData.phoneNumber || "")
    }, [userData])
    function handleSubmit(e) {
        e.preventDefault()
    }

    const [openAddType, setOpenAddType] = useState(false)
    function setAlreadyPresentAddress(e) {
        const seletedValue = e.target.value
        setAddressType(seletedValue)
        const selectedAddress = userData.addresses.find((item) => item.addressType === seletedValue)
        if (selectedAddress) {
            setAddress1(selectedAddress.address1 || "")
            setAddress2(selectedAddress.address2 || "")
            setCountry(selectedAddress.country || "")
            setCity(selectedAddress.city || "")
            setZipCode(selectedAddress.zipCode || "")
        }

    }
    const [totalSubPrice, setTotalSubPrice] = useState(0)
    const [shippingPrice, setShippingPrice] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [couponCode, setCouponCode] = useState("")

    useEffect(() => {
        const totalSPrice = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0)
        setTotalSubPrice(totalSPrice)
        const shipping = (totalSPrice / 100) * 10
        setShippingPrice(shipping)
    }, [cart])

    async function applyCoupon() {
        try {
            const { data } = await axios.get(backend_url + `/api/coupon/find-coupon/${couponCode}`, { withCredentials: true })
            if (data.success) {
                const productsoOfSameShop = cart.filter((item) => item.product.shop._id === data.data.shop._id)
                console.log(productsoOfSameShop)
                if (productsoOfSameShop.length !== 0) {
                    const price = productsoOfSameShop.reduce((acc, item) => acc + (item.product.price * item.quantity), 0)
                    const couponValue = data.data.value
                    const discountAmount = (price / 100) * couponValue
                    setDiscount(discountAmount)
                } else {
                    setDiscount(0)
                    alert("Coupon is not valid for these products")
                }
            } else {
                setDiscount(0)
                alert(data.message)
            }
        } catch (error) {
            setDiscount(0)
            console.log(error.response?.data?.message)
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
        const totalPrice = totalSubPrice + shippingPrice - discount
        const paymentInfo = 'pending'
        console.log("placing order")
        try {
            const { data } = await axios.post(backend_url + "/api/order/create-order",
                { cart, shippingAddress, user:userData, totalPrice, paymentInfo },
                { withCredentials: true }
            )
        } catch (error) {
            console.log(error.response?.data?.message)
            // console.log(error.response)
        }
    }
    return (
        <>
            <div className="w-[80%] flex justify-center gap-4">
                <div className="bg-white p-4 rounded-md w-[70%] ">
                    <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
                    <form
                        action=""
                        className="bg-white w-full overflow-y-auto rounded-sm"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex gap-4">
                            <div className="flex flex-col gap-2 flex-1">
                                <div>
                                    <p>Full Name</p>
                                    <input
                                        type="text"
                                        className="w-full h-8 bg-white border border-gray-200 rounded-sm outline-none pl-1"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <p>Phone Number</p>
                                    <input
                                        type="text"
                                        className="w-full h-8 bg-white border border-gray-200 rounded-sm outline-none pl-1"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <p>Country</p>
                                    <select
                                        name=""
                                        id=""
                                        className="w-full border border-gray-300 rounded-sm h-8 focus:outline-none"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                    >
                                        <option value="">Choose your Country</option>
                                        {
                                            Country && Country.getAllCountries().map((item) => (
                                                <option
                                                    value={item.isoCode}
                                                    key={item.isoCode}
                                                >{item.name}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div>
                                    <p>Address1</p>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-sm h-8 focus:outline-none pl-1"
                                        value={address1}
                                        onChange={(e) => setAddress1(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 flex-1">
                                <div>
                                    <p>Email Address</p>
                                    <input
                                        type="email"
                                        className="w-full h-8 bg-white border border-gray-200 rounded-sm outline-none pl-1"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <p>Zip Code</p>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-sm h-8 focus:outline-none pl-1"
                                        value={zipCode}
                                        onChange={(e) => setZipCode(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <p>City</p>
                                    <select
                                        name=""
                                        id=""
                                        className="w-full border border-gray-300 rounded-sm h-8 focus:outline-none"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                    >
                                        <option value="">Choose your City</option>
                                        {
                                            City && City.getCitiesOfCountry(country).map((item) => (
                                                <option
                                                    value={item.isoCode}
                                                    key={item.isoCode}
                                                >{item.name}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div>
                                    <p>Address2</p>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-sm h-8 focus:outline-none pl-1"
                                        value={address2}
                                        onChange={(e) => setAddress2(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <h2
                            className="mt-4 text-blue-500 cursor-pointer font-bold"
                            onClick={() => setOpenAddType(!openAddType)}
                        >
                            Want to select from entered addresses?
                        </h2>
                        <div className={`mt-2 ${openAddType ? "" : "hidden"}`}>
                            <select
                                name=""
                                id=""
                                className="w-full h-8 bg-white border border-gray-200 rounded-sm outline-none pl-1"
                                value={addressType}
                                onChange={setAlreadyPresentAddress}
                            >
                                <option value="" disabled>select address type</option>
                                {
                                    userData?.addresses?.map((item, index) => (
                                        <option
                                            value={item.addressType}
                                            key={index}
                                        >
                                            {item.addressType}
                                        </option>
                                    ))
                                }

                            </select>
                        </div>
                    </form >
                </div >

                {/* pricing */}
                <div className="w-[30%] flex flex-col gap-4 bg-white p-4 rounded-md">
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-600">subtotal:</p>
                        <p className="font-bold">{totalSubPrice}</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-600">shipping:</p>
                        <p className="font-bold">{shippingPrice}</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-600">discount:</p>
                        <p className="font-bold">{discount}</p>
                    </div>
                    <hr className="text-gray-300" />
                    <div className="flex justify-end">

                        <p className="font-bold">{totalSubPrice + shippingPrice - discount}</p>
                    </div>
                    <div>
                        <input
                            type="text"
                            className="w-full border border-gray-200 rounded-sm focus:outline-none h-8 pl-1"
                            placeholder="coupon code"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                        />
                    </div>
                    <button
                        className="w-full border-[2px] border-red-100 text-red-600 rounded-xs cursor-pointer"
                        onClick={applyCoupon}
                    >
                        Apply Coupon
                    </button>
                </div>
            </div>
            <div>
                <button
                    // onClick={() => setStage(2)}
                    className="bg-black text-white px-12 py-2 rounded-md cursor-pointer"
                    onClick={placeOrder}
                >Go to Payment</button>
            </div>
        </>
    )
}
export default ShippingDetails

