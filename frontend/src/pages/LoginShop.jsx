import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { shopContext } from "../context/ShopContext"
import axios from "axios"

function LoginShop() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(true)
    const {backend_url, fetchSellerData} = useContext(shopContext)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const {data} = await axios.post(backend_url+"/api/shop/login-shop", {email, password}, {withCredentials: true})
            if(data.success){
                await fetchSellerData()
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
            <form className="flex flex-col items-center w-[30%] m-auto border border-gray-200 rounded-lg p-5" onSubmit={handleSubmit}>
                <p className="text-2xl font-bold">Login to your Shop</p>
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
                    <div className="flex items-center justify-between mt-3 mb-3">
                        <div>
                        <input type="checkbox" name="" id="" />
                        <label htmlFor="remember" className="text-sm text-gray-900 ml-1">
                            Remember me
                        </label>
                        </div>
                        <p className="text-blue-600 text-sm font-semibold cursor-pointer">forgot your password?</p>
                    </div>
                    <button type="submit" className="w-full h-8 bg-blue-600 text-sm text-white font-semibold rounded-md cursor-pointer">Submit</button>
                    <p className="text-sm mt-3">Not have any account? <span className="text-blue-600 cursor-pointer" onClick={()=>navigate("/create-shop")}>Sign Up</span></p>
                </div>
            </form>
        </div>
    )
}




export default LoginShop