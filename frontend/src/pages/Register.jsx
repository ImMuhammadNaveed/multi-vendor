import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { generalContext } from "../context/Context"
import { userContext } from "../context/UserContext"

function Register() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [image, setImage] = useState(false)
    const [showPassword, setShowPassword] = useState(true)
    const navigate = useNavigate()
    const {backend_url} = useContext(generalContext)
    const {getUserData, setUserLoggedIn} = useContext(userContext)

    async function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData
        formData.append("name", name)
        formData.append("email", email)
        formData.append("password", password)
        formData.append("image", image)
        try {
            const {data} = await axios.post(backend_url+"/api/user/register", formData, {withCredentials: true})
            console.log(data)
            if(data.success){
                await getUserData()
                setUserLoggedIn(true)
                navigate("/")
            }else{
                alert(data.message)
            }
        } catch (error) {
            if(error.response){
                alert(error.response.data.message)
            }
            console.log(error)
        }
    }

    return (
        <div className="flex items-center min-h-screen">
            <form className="flex flex-col items-center w-[30%] m-auto border border-gray-200 rounded-lg p-5">
                <p className="text-2xl font-bold">Register as a new user</p>
                <div className="w-full mt-7">
                    <p className="text-sm text-gray-900 mb-2">Full Name</p>
                    <input
                        type="text"
                        name=""
                        id=""
                        className="border rounded-md border-gray-300 w-full h-8 focus:outline-none pl-[6px]"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </div>
                <div className="w-full mt-7">
                    <p className="text-sm text-gray-900 mb-2">Email address</p>
                    <input
                        type="text"
                        name=""
                        id=""
                        className="border rounded-md border-gray-300 w-full h-8 focus:outline-none pl-[6px]"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>
                <div className="w-full mt-7">
                    <p className="text-sm text-gray-900 mb-2">Password</p>
                    <div className="flex items-center justify-between border rounded-md border-gray-300 w-full h-8">
                        <input
                            type={showPassword ? "text" : "password"}
                            name=""
                            id=""
                            className="flex-1 h-full rounded-md focus:outline-none pl-[6px]"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        {showPassword
                            ? <button type="button" onClick={() => setShowPassword(false)}><i className="fa-regular fa-eye mr-2"></i></button>
                            : <button type="button" onClick={() => setShowPassword(true)}><i className="fa-regular fa-eye-slash mr-2"></i></button>
                        }

                    </div>
                    <div className="flex items-center my-4">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full overflow-hidden bg-gray-100">
                            {image
                            ? <img src={URL.createObjectURL(image)} alt="" className="w-full h-full object-cover" />
                            : <i className="fa-regular fa-circle-user text-2xl text-gray-500"></i>}
                        </div>
                        
                        <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])} hidden />
                        <label htmlFor="image" className="ml-4 border border-gray-300 rounded rounded-md text-sm text-gray-500 px-3 py-2 cursor-pointer">Upload a file</label>
                    </div>
                    <button onClick={handleSubmit} className="w-full h-8 bg-blue-600 text-sm text-white font-semibold rounded-md cursor-pointer">Submit</button>
                    <p className="text-sm mt-3">Already have an account? <span className="text-blue-600 cursor-pointer" onClick={()=>navigate("/login")}>Sign In</span></p>
                </div>
            </form>
        </div>
    )
}

export default Register