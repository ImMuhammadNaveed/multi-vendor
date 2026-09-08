import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { toast } from "react-toastify"
import { backend_url } from "../server"
import VerificationAnimation from "../assets/VerificationAnimation"
import { getUser } from "../redux/thunks/user"
import { useDispatch } from "react-redux"

function VerifyAccount() {
    const [searchParams] = useSearchParams()
    const token = searchParams.get("token")
    const [status, setStatus] = useState("loading")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        let cancelled = false

        async function verifyAccount() {
            try {
                const { data } = await axios.post(
                    backend_url + "/api/user/verify-account",
                    { token },
                    { withCredentials: true }
                )

                if (data.success) {
                    dispatch(getUser())
                    if (!cancelled) setStatus("verified")
                    navigate("/")
                    toast.success(data.message)
                } else {
                    if (!cancelled) setStatus("failed")
                    toast.error(data.message)
                }
            } catch (error) {
                toast.error(error?.response?.data?.message)
                if (!cancelled) setStatus("failed")
            }
        }

        verifyAccount()

        return () => {
            cancelled = true
        }
    }, [token])

    if (status === "loading") {
        return <VerificationAnimation />
    }

    return status === "verified"
        ? <div className="h-50 flex items-center justify-center">
            <p className="font-semibold text-lg">Account Verified</p>
        </div>
        : <div className="h-50 flex items-center justify-center">
            <p className="font-semibold text-lg">Account verification failed</p>
        </div>
}

export default VerifyAccount
