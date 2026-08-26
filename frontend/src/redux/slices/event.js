import {createSlice} from '@reduxjs/toolkit'
import {
    setAllEventsReducer,
    setLoadingReducer
} from '../reducers/event'

const initialState = {
    allEvents : [],
    loading : false,
}

const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers:{
        setAllEvents: setAllEventsReducer,
        setLoading: setLoadingReducer
    }
})


export const {setAllEvents, setLoading} = eventSlice.actions
export default eventSlice.reducer