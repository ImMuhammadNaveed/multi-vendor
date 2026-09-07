import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { getSeller } from "../redux/thunks/shop"
import { backend_url } from "../server"
import VerificationAnimation from "../assets/VerificationAnimation"

function VerifyShop() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const token = params.get("shopActivationToken")
    const [activate, setActivate] = useState(null)

    useEffect(() => {
        let cancelled = false

        async function activateShop() {
            try {
                const { data } = await axios.post(
                    backend_url + "/api/shop/verify-shop",
                    { token },
                    { withCredentials: true }
                )

                if (data.success) {
                    dispatch(getSeller())
                    if (!cancelled) setActivate(true)
                    navigate("/")
                    toast.success(data.message)
                } else {
                    if (!cancelled) setActivate(false)
                    toast.error(data.message)
                }
            } catch (error) {
                toast.error(error?.response?.data?.message)
                if (!cancelled) setActivate(false)
            }
        }

        activateShop()

        return () => {
            cancelled = true
        }
    }, [dispatch, navigate, token])

    if (activate === null) {
        return <VerificationAnimation />
    }

    return activate
        ? <h1>Shop Activated</h1>
        : <h1>Shop Activation failed</h1>
}

export default VerifyShop
