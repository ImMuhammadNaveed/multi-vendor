import axios from "axios"
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { backend_url } from "../server"
import { useDispatch } from "react-redux"
import { getSellerAction } from '../redux/actions/shop'
import { toast } from "react-toastify"

function VerifyShop() {
    const dispatch = useDispatch()
    const [activate, setActivate] = useState(null)
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const token = params.get("shopActivationToken")
    async function activateShop() {
        try {
            const { data } = await axios.post(backend_url + '/api/shop/verify-shop', { token: token }, { withCredentials: true })
            // console.log(response)
            if (data.success) {
                dispatch(getSellerAction())
                setActivate(true)
                navigate("/")
                toast.success(data.message)
            }else{
                setActivate(false)
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
            console.log(error.response.data.message)
            setActivate(false)
        }
    }
    useEffect(() => {
        activateShop()
    }, [])
    return (
        <>{activate === null
            ? (<h1>Verifing 🔃</h1>)
            : activate
                ? <h1>Shop Activated ✅</h1 >
                : <h1>Shop Activation faied❌</h1>
        } </>
    )
}


export default VerifyShop