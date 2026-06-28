import { useContext, useState, useEffect } from "react"
import { userContext } from "../../context/UserContext"
import { IoCameraOutline } from "react-icons/io5";
function ChangeProfile() {
    const { userData, backend_url } = useContext(userContext)

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
                alert(data.message)
            }

        } catch (error) {
            alert(error.response.data.message)
        }
    }

    return userData && (
        <form onSubmit={handleSubmit}>
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
                <label htmlFor="image" className="rounded-full absolute bottom-0 right-84 bg-gray-200 cursor-pointer">
                    <IoCameraOutline size={15} className="m-2" />
                </label>

            </div>
            <div className="flex justify-between mt-6 ">
                <div>
                    <div className="mb-2">
                        <p>Full Name</p>
                        <input
                            type="text"
                            className="w-92 bg-white border border-gray-200 rounded-sm outline-none pl-1"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <p>Phone Number</p>
                        <input
                            type="text"
                            className="w-92 bg-white border border-gray-200 rounded-sm outline-none pl-1"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <button
                        className="border border-purple-500 text-purple-500 px-16 py-1 text-sm mt-6 rounded-sm cursor-pointer"
                        type="submit"
                    >Update</button>
                </div>
                <div>
                    <div className="mb-2">
                        <p>Email Address</p>
                        <input
                            type="email"
                            className="w-92 bg-white border border-gray-200 rounded-sm outline-none pl-1"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <p>Password</p>
                        <input
                            type="password"
                            className="w-92 bg-white border border-gray-200 rounded-sm outline-none pl-1"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </form>
    )
}
export default ChangeProfile