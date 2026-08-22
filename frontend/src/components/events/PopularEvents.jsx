import { useSelector } from "react-redux"
import EventCard from "./EventCard"
import { useEffect, useState } from "react"

function PopularEvents() {
    const events = useSelector(state=> state.event.allEvents)
    const [latestEvent, setLatestEvent] = useState(null)
    useEffect(()=>{
        setLatestEvent(events.at(-1))
    },[events])
    useEffect(()=>{
        console.log("popular event: ",latestEvent)
        // console.log(events)
    },[latestEvent])
    return latestEvent&&(
        <>
        <div className="w-[90%] m-auto mt-10">
            <p className="text-3xl font-bold mb-5">Popular Events</p>
            <EventCard event={latestEvent}/>
        </div>
        
        </>
    )
}




export default PopularEvents