import axios from "axios"
import { backend_url } from "../../server"
import { createAsyncThunk } from "@reduxjs/toolkit"


export const getAllEvents = createAsyncThunk(
    'event/getAllEvents',
    async (_, {rejectWithValue})=>{
        try {
            const { data } = await axios.get(backend_url + "/api/event/all-events", { withCredentials: true })
            console.log("all events: ",data)
            if (!data.success) {
                return rejectWithValue(data.message || "Failed to get all events")
            }
            return data.events
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to get all events"
            )
        }
    }
)

export const getShopEvents = createAsyncThunk(
    'event/shopEvents',
    async (id, {rejectWithValue})=>{
        try {
            const { data } = await axios.get(backend_url + `/api/event/events-of-shop/${id}`, { withCredentials: true })
            if (!data.success) {
                return rejectWithValue(data.message || "Failed to get shop events")
            }
            return data.data
        } catch (error) {
            console.log(error.response?.data?.message)
        }
    }
)

export const deleteEvent = createAsyncThunk(
    "event/deleteEvent",
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await axios.delete(backend_url + `/api/event/delete-event/${id}`, { withCredentials: true })
            if (!data.success) {
                return rejectWithValue(data.message || "Failed to delete event")
            }
            return { id: id, data: data }
        } catch (error) {
            toast.error(error.response?.data?.message)
            return rejectWithValue(
                error.response?.data?.message || "Failed to delete event"
            )
        }
    }
)