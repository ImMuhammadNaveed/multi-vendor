import { useState, useEffect } from "react"
import { IoCameraOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { backend_url } from "../../server";
import { toast } from "react-toastify";
import ProfileAnimation from '../../assets/ProfileAnimation'
function ChangeProfile() {
    const userData = useSelector(state => state.user.user)
    const loading = useSelector(state=> state.user.loading)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [password, setPassword] = useState("")
    const [image, setImage] = useState(null)
    const [previewImage, setPreviewImage] = useState("")

    useEffect(() => {
        if (userData) {
            setName(userData.name || "")
            setEmail(userData.email || "")
            setPhoneNumber(userData.phoneNumber || "")
            setPreviewImage(`${backend_url}/uploads/` + userData.avator)
        }
    }, [userData])

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
            const formData = new FormData()
            formData.append("name", name)
            formData.append("email", email)
            formData.append("phoneNumber", phoneNumber)
            formData.append("password", password)
            formData.append("image", image)
            const { data } = await axios.post(backend_url + "/api/user/update", formData, { withCredentials: true })
            if (data.success) {
                toast.success(data.message)
            }

        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    if(loading){
        return <ProfileAnimation/>
    }
    return userData && (
        <form onSubmit={handleSubmit} className="w-full ">
            <div className="relative w-36 h-36 mx-auto">
                <img
                    src={previewImage || null}
                    alt=""
                    className="w-full h-full object-cover rounded-full mx-auto border-2 border-green-500"
                />

                <label htmlFor="image" className="rounded-full absolute bottom-2 right-2 bg-gray-200 cursor-pointer">
                    <IoCameraOutline size={15} className="m-2" />
                    <input
                        type="file"
                        id="image"
                        hidden
                        onChange={handleChangeImage}
                    />
                </label>

            </div>
            <div className="flex flex-col lg:flex-row justify-between mt-6 ">
                <div>
                    <div className="mb-2">
                        <p>Full Name</p>
                        <input
                            type="text"
                            className="w-full lg:w-92 bg-white border border-gray-200 rounded-sm outline-none pl-1"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <p>Phone Number</p>
                        <input
                            type="text"
                            className="w-full lg:w-92 bg-white border border-gray-200 rounded-sm outline-none pl-1"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <div className="mb-2">
                        <p>Email Address</p>
                        <input
                            type="email"
                            className="w-full lg:w-92 bg-white border border-gray-200 rounded-sm outline-none pl-1"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <p>Password</p>
                        <input
                            type="password"
                            className="w-full lg:w-92 bg-white border border-gray-200 rounded-sm outline-none pl-1"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>

            </div>
            <button
                className="w-full border border-purple-500 text-purple-500 px-16 py-1 text-sm mt-2 rounded-sm cursor-pointer"
                type="submit"
            >Update</button>
        </form>
    )
}
export default ChangeProfile