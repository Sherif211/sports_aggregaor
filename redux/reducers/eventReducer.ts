import {FETCH_EVENT_DATA, FETCH_LINEUPS_DATA} from '../actions/types'

const initialState = {
    event: {},
    lineups: null,
    incidents: [],
    h2h: [],
    tweets: [],
    content: null,
    stats: [],
    raceStages: [],
    raceStanding: [],
    titleEventInfo: null
}
const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_EVENT_DATA:
            return {
                ...state,
                ...action.payload
            }

        case FETCH_LINEUPS_DATA:
            return {
                ...state,
                lineups: action.payload
            }
        default:
            return state
    }
}

export default eventReducer