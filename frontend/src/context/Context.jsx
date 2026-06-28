import { createContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
export const generalContext = createContext()

export function GeneralContextProvider({ children }) {
    const backend_url = import.meta.env.VITE_BACKEND_URL
    const [events, setEvents] = useState([])
    

    async function getAllEvents() {
        try {
            const {data} = await axios.get(backend_url+"/api/event/all-events",{withCredentials: true})
            if(data.success){
                setEvents(data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getAllEvents()
    },[])

    

    const values = {
        backend_url,
        events,
        
    }

    return <generalContext.Provider value={values}>
        {children}
    </generalContext.Provider>
}