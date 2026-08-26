export function setAllEventsReducer(state, action){
    state.allEvents = action.payload
}

export function setLoadingReducer(state, action) {
    state.loading = action.payload
}
