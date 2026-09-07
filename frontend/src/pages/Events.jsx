// import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EventCard from "../components/events/EventCard";
import EventCardAnimation from "../assets/EventCardAnimation";
// import { generalContext } from "../context/Context";

function Events() {
    // const {events} = useContext(generalContext)
    const events = useSelector(state=> state.event.allEvents)
    const loading = useSelector(state => state.event.allEventsLoading)

    if (loading) {
        return <EventCardAnimation count={3} />
    }

    if (events.length === 0) {
        return (
            <div className="flex min-h-60 items-center justify-center">
                <p className="text-lg font-semibold">No events available!</p>
            </div>
        )
    }

    return (
        <>
        <div>
            {
                events.map((event, index)=>(
                    <EventCard event={event} key={index}/>
                ))
            }
        </div>
        </>
    )
}




export default Events
