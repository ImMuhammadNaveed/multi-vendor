import { useSearchParams } from "react-router-dom"
import axios from 'axios'
import { useContext, useEffect, useState } from "react"
import { generalContext } from "../context/Context"

function VerifyAccount() {
    const [loading, setLoading] = useState(false)
    const [verified, setVerified] = useState(false)
    const [searchParams] = useSearchParams()
    const token = searchParams.get("token")

    const {backend_url} = useContext(generalContext)

    async function verifyAccount() {
        try {
            setLoading(true)
            const {data} = await axios.post(backend_url+"/api/user/verify-account", {token}, {withCredentials: true})
            alert(data.message)
            if(data.success){
                setVerified(true)
            }
        } catch (error) {
            if(error.response){
                alert(error.response.data.message)
            }
            console.log(error)
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