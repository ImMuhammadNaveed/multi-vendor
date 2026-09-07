import {createSlice} from '@reduxjs/toolkit'
import { deleteEvent, getAllEvents, getShopEvents } from '../thunks/event'

const initialState = {
    allEvents : [],
    shopEvents: [],
    allEventsLoading: true,
    shopEventsLoading: true,
    deleteEventLoading: false
}

const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder.addCase(getAllEvents.pending, (state)=>{
            state.allEventsLoading = true
        })
        builder.addCase(getAllEvents.fulfilled, (state, action)=>{
            state.allEventsLoading = false
            state.allEvents = action.payload
        })
        builder.addCase(getAllEvents.rejected, (state, action)=>{
            state.allEventsLoading = false
        })
        builder.addCase(getShopEvents.pending, (state)=>{
            state.shopEventsLoading = true
            state.shopEvents = []
        })
        builder.addCase(getShopEvents.fulfilled, (state, action)=>{
            state.shopEventsLoading = false
            state.shopEvents = action.payload
        })
        builder.addCase(getShopEvents.rejected, (state, action)=>{
            state.shopEventsLoading = false
            state.shopEvents = []
        })
        builder.addCase(deleteEvent.pending, (state, action)=>{
            state.deleteEventLoading = true
        })
        builder.addCase(deleteEvent.fulfilled, (state, action)=>{
            state.deleteEventLoading = false
            state.shopEvents = state.shopEvents.filter((e)=>e._id !== action.payload.id)
        })
        builder.addCase(deleteEvent.rejected, (state, action)=>{
            state.deleteEventLoading = false
        })
    }
})



export default eventSlice.reducer
