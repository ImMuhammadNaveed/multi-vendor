import { useState } from "react"
import ShippingDetails from "../components/order/ShippingDetails"
import Payment from "../components/order/Payment"
import Success from "../components/order/Success"
import axios from "axios"

function Shipping() {
    const [stage, setStage] = useState(1)
    const [couponCode, setCouponCode] = useState("")

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [country, setCountry] = useState("")
    const [city, setCity] = useState("")
    const [addressType, setAddressType] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')


    return (
        <div className="w-full flex flex-col gap-8 items-center bg-[#F5F6FB] py-8">
            <div className="flex justify-center items-center">
                <p className={`bg-red-600 text-white px-6 py-1 rounded-full`}>1.Shipping</p>
                <div className={`lg:w-16 w-6 h-1 bg-red-100 ${stage === 2 || stage === 3 ? "bg-red-600" : ""}`}></div>
                <p className={`text-red-600 bg-red-100 px-6 py-1 rounded-full ${stage === 2 || stage === 3 ? "bg-red-600 text-white" : ""}`}>2.Payment</p>
                <div className={`lg:w-16 w-6 h-1 bg-red-100 ${stage === 3 ? "bg-red-600" : ""}`}></div>
                <p className={`text-red-600 bg-red-100 px-6 py-1 rounded-full ${stage === 3 ? "bg-red-600 text-white" : ""}`}>3.Success</p>
            </div>
            {
                stage === 1
                    ? <ShippingDetails
                        couponCode={couponCode} setCouponCode={setCouponCode}
                        stage={stage} setStage={setStage}
                        name={name} setName={setName}
                        email={email} setEmail={setEmail}
                        phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}
                        country={country} setCountry={setCountry}
                        city={city} setCity={setCity}
                        addressType={addressType} setAddressType={setAddressType}
                        zipCode={zipCode} setZipCode={setZipCode}
                        address1={address1} setAddress1={setAddress1}
                        address2={address2} setAddress2={setAddress2}
                    />
                    : stage === 2
                        ? <Payment
                            couponCode={couponCode}
                            stage={stage} setStage={setStage}
                            name={name} setName={setName}
                            email={email} setEmail={setEmail}
                            phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}
                            country={country} setCountry={setCountry}
                            city={city} setCity={setCity}
                            addressType={addressType} setAddressType={setAddressType}
                            zipCode={zipCode} setZipCode={setZipCode}
                            address1={address1} setAddress1={setAddress1}
                            address2={address2} setAddress2={setAddress2}
                        />
                        : stage === 3
                            ? <Success stage={stage} />
                            : ""
            }


        </div>
    )
}



export default Shipping