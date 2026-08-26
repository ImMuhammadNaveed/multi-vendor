import { setAllEvents, setLoading } from "../slices/event"
import axios from "axios"
import { backend_url } from "../../server"

export function getAllEventsAction() {
    return async function (dispatch) {
        try {
            dispatch(setLoading(true))
            const { data } = await axios.get(backend_url + "/api/event/all-events", { withCredentials: true })
            console.log("data at getAllEventsAction: ", data)
            if (data.success) {
                dispatch(setAllEvents(data.events))
            }
        } catch (error) {
            console.log(error.response)
        }finally{
            dispatch(setLoading(false))
        }
    }
}