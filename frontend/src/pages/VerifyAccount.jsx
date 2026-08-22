import { useSearchParams } from "react-router-dom"
import axios from 'axios'
import { useEffect, useState } from "react"
import { backend_url } from "../server"
import { toast } from "react-toastify"

function VerifyAccount() {
    const [loading, setLoading] = useState(false)
    const [verified, setVerified] = useState(false)
    const [searchParams] = useSearchParams()
    const token = searchParams.get("token")

    async function verifyAccount() {
        try {
            setLoading(true)
            const {data} = await axios.post(backend_url+"/api/user/verify-account", {token}, {withCredentials: true})
            if(data.success){
                setVerified(true)
                toast.success(data.message)
            }
        } catch (error) {
            if(error.response){
                toast.error(error.response.data.message)
            }
        }finally{
            setLoading(false)
        }
    }
    useEffect(()=>{verifyAccount()}, [])
    if(loading){
        return(
            <>loading...</>
        )
    }
    if(verified){
        return(
            <>Verified✅</>
        )
    }
    return(
        <>

        </>
    )    
}



export default VerifyAccount