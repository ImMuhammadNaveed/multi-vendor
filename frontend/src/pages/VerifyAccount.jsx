import axios from "axios"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { toast } from "react-toastify"
import { backend_url } from "../server"
import VerificationAnimation from "../assets/VerificationAnimation"

function VerifyAccount() {
    const [searchParams] = useSearchParams()
    const token = searchParams.get("token")
    const [status, setStatus] = useState("loading")

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
                    if (!cancelled) setStatus("verified")
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
        ? <h1>Account Verified</h1>
        : <h1>Account Verification failed</h1>
}

export default VerifyAccount
