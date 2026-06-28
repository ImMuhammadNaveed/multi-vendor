import { Country, State, City } from 'country-state-city'
import { RxCross1 } from "react-icons/rx";
import { useContext, useState } from 'react';
import { userContext } from '../../context/UserContext';
import { AiTwotoneDelete } from "react-icons/ai";
function Address() {
    const { backend_url, userData } = useContext(userContext)
    const [openAddressForm, setOpenAddressForm] = useState(false)

    const [country, setCountry] = useState("")
    const [city, setCity] = useState("")
    const [addressType, setAddressType] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')

    const addressTypes = [
        { name: "Default" },
        { name: "Home" },
        { name: "Office" },
    ]
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const { data } = await axios.post(backend_url + "/api/user/add-address", { addressType, city, country, zipCode, address1, address2 }, { withCredentials: true })
            if (data.success) {
                alert(data.message || "Address successfully added!")
            }
        } catch (error) {
            console.log(error.response?.data?.message)
        }
    }
    async function deleteAddress(id) {
        try {
            const { data } = await axios.delete(backend_url + `/api/user/delete-address/${id}`, { withCredentials: true })
            // console.log(data)
            alert(data.message)
        } catch (error) {
            console.log(error.response.data.message)
        }
    }
    return userData && (
        <div>
            {openAddressForm &&
                <div className="flex justify-center items-center bg-black/40 w-full h-screen fixed inset-0">
                    <form
                        action=""
                        className="flex flex-col gap-2 bg-white w-[35%] overflow-y-auto p-2 rounded-sm"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex justify-end">
                            <RxCross1
                                onClick={() => setOpenAddressForm(false)}
                                size={25}
                                className="cursor-pointer"
                            />
                        </div>
                        <h1 className="text-center text-xl font-bold">Add New Address</h1>
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
                                        <option value={item.isoCode}>{item.name}</option>
                                    ))
                                }
                            </select>
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
                                        <option value={item.isoCode}>{item.name}</option>
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
                        <div>
                            <p>Address2</p>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded-sm h-8 focus:outline-none pl-1"
                                value={address2}
                                onChange={(e) => setAddress2(e.target.value)}
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
                            <p>Address Type</p>
                            <select
                                name=""
                                id=""
                                className="w-full border border-gray-300 rounded-sm h-8 focus:outline-none"
                                value={addressType}
                                onChange={(e) => setAddressType(e.target.value)}
                            >
                                <option value=""></option>
                                {
                                    addressTypes.map((item) => (
                                        <option value={item.name}>{item.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <button type="submit" className="w-full rounded-sm bg-gray-700 cursor-pointer text-white font-bold text-lg mt-2 h-8">Add</button>
                    </form>
                </div>
            }{
                userData?.addresses
                    ? <div>
                        <div className="flex justify-between items-center">
                            <p className="text-3xl font-semibold">My Addresses</p>
                            <button className="bg-black text-white py-2 px-4 rounded-md cursor-pointer" onClick={() => setOpenAddressForm(true)}>Add New</button>
                        </div>
                        {userData.addresses.map((item, index) => (
                            <div key={index} className="flex justify-between items-center bg-white mt-6 p-4 rounded-md h-15">
                                <div className="flex items-center">
                                    <p className="font-semibold pl-4">{item.addressType}</p>
                                </div>
                                <div className="flex items-center text-sm">
                                    <p>{item.address1}, {item.address2}</p>
                                </div>
                                <div className="flex items-center text-sm">
                                    <p>{userData.phoneNumber}</p>
                                </div>
                                <div className="w-15 cursor-pointer">
                                    <AiTwotoneDelete
                                        size={25}
                                        onClick={() => deleteAddress(item._id)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    : ""
            }


        </div>
    )
}
export default Address