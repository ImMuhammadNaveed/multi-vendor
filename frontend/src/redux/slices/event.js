import {createSlice} from '@reduxjs/toolkit'
import {
    setAllEventsReducer
} from '../reducers/event'

const initialState = {
    allEvents : [],
    loading : false,
}

const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers:{
        setAllEvents: setAllEventsReducer
    }
})


export const {setAllEvents} = eventSlice.actions
export default eventSlice.reducer