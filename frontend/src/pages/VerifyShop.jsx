import axios from "axios"
import { useContext } from "react"
import { useState } from "react"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { shopContext } from "../context/ShopContext"

function VerifyShop() {
    const [activate, setActivate] = useState(null)
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const token = params.get("shopActivationToken")
    const { backend_url, fetchShopData } = useContext(shopContext)
    async function activateShop() {
        try {
            const { data } = await axios.post(backend_url + '/api/shop/verify-shop', { token: token }, { withCredentials: true })
            // console.log(response)
            if (data.success) {
                await fetchShopData()
                setActivate(true)
                navigate("/")
            }else{
                setActivate(false)
            }
            alert(data.message)
        } catch (error) {
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