import { useState, useEffect } from "react"
import { IoCameraOutline } from "react-icons/io5";
import axios from "axios";
import { backend_url } from "../../server";
import { getImageUrl } from "../../utils/image";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import LoadingButton from "../loading/LoadingButton";

function Settings() {
    const sellerData = useSelector(state=> state.shop.seller)

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [address, setAddress] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [zipCode, setZipCode] = useState("")

    const [image, setImage] = useState(null)
    const [previewImage, setPreviewImage] = useState("")
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        if (sellerData) {
            setName(sellerData.name || "")
            setDescription(sellerData.description || "")
            setAddress(sellerData.address)
            setPhoneNumber(sellerData.phoneNumber || "")
            setZipCode(sellerData.zipCode || "")
            setPreviewImage(getImageUrl(sellerData.avator))
        }
    }, [sellerData])

    function handleChangeImage(e) {
        const file = e.target.files[0]
        if (file) {
            setImage(file)
            setPreviewImage(URL.createObjectURL(file))
        }
    }

    async function handleSubmit(e) {
        try {
            e.preventDefault()
            setSubmitting(true)
            const formData = new FormData()
            formData.append("name", name)
            formData.append("description", description)
            formData.append("address", address)
            formData.append("phoneNumber", phoneNumber)
            formData.append("zipCode", zipCode)
            formData.append("image", image)
            const { data } = await axios.post(backend_url + "/api/shop/update-seller", formData, { withCredentials: true })
            if(data.success){
                toast.success(data.message)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error.response?.data?.message)
        } finally {
            setSubmitting(false)
        }
    }

    return sellerData && (
        <div className="lg:w-120 w-full mx-auto my-auto flex items-center">
        <form
            onSubmit={handleSubmit}
            className="lg:h-115 h-full flex-1 bg-white p-3 rounded-md overflow-y-scroll scrollbar-hide"
        >
            <div className="w-full relative">
                <img
                    src={previewImage || null}
                    alt=""
                    className="w-36 h-36 object-cover rounded-full mx-auto border-2 border-green-500"
                />
                <input
                    type="file"
                    id="image"
                    hidden
                    onChange={handleChangeImage}
                />
                <label htmlFor="image" className="rounded-full absolute bg-gray-200 cursor-pointer left-66 bottom-2">
                    <IoCameraOutline size={15} className="m-2" />
                </label>

            </div>
            <div className="flex flex-col gap-4 mt-6 flex-1 ">
                <div className="">
                    <p>Full Name</p>
                    <input
                        type="text"
                        className="w-full h-8 bg-white border border-gray-200 rounded-sm outline-none pl-1"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="">
                    <p>Shop description</p>
                    <input
                        type="text"
                        className="w-full h-8 bg-white border border-gray-200 rounded-sm outline-none pl-1"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="">
                    <p>Shop Address</p>
                    <input
                        type="text"
                        className="w-full h-8 bg-white border border-gray-200 rounded-sm outline-none pl-1"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className="">
                    <p>Phone Number</p>
                    <input
                        type="text"
                        className="w-full h-8 bg-white border border-gray-200 rounded-sm outline-none pl-1"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>
                <div className="">
                    <p>Password</p>
                    <input
                        type="text"
                        className="w-full h-8 bg-white border border-gray-200 rounded-sm outline-none pl-1"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                    />
                </div>
                <LoadingButton
                    loading={submitting}
                    className="border h-8 border-purple-500 text-purple-500 w-full py-1 text-sm rounded-sm cursor-pointer"
                    type="submit"
                >Update</LoadingButton>
            </div>
        </form>
        </div>
    )
}


export default Settings
