// import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EventCard from "../components/events/EventCard";
import axios from 'axios'
// import { generalContext } from "../context/Context";

function Events() {
    // const {events} = useContext(generalContext)
    const events = useSelector(state=> state.event.allEvents)
    
    return events&&(
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