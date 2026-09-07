import { useSelector } from "react-redux"
import EventCard from "./EventCard"
import EventCardAnimation from "../../assets/EventCardAnimation"

function PopularEvents() {
    const events = useSelector(state=> state.event.allEvents)
    const loading = useSelector(state => state.event.allEventsLoading)
    const latestEvent = events.at(-1)

    if (loading) {
        return <EventCardAnimation />
    }

    if (!latestEvent) {
        return null
    }

    return (
        <>
        <div className="w-[90%] m-auto mt-10">
            <p className="text-3xl font-bold mb-5">Popular Events</p>
            <EventCard event={latestEvent}/>
        </div>
        
        </>
    )
}




export default PopularEvents
