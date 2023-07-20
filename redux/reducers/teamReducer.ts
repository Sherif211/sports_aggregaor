import {FETCH_TEAM} from '../actions/types'

const initialState = {
    team: {},
    matches: [],
    players: [],
    videos: [],
    tournaments: [],
    stats: [],
    content: null,
    nextMatch: null,
    loading: false
}
const teamReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TEAM:
            return {
                ...state,
                team: action.payload.team,
                matches: action.payload.matches,
                players: action.payload.players,
                tournaments: action.payload.tournaments,
                content: action.payload.content,
                nextMatch: action.payload.nextMatch,
                tweets: action.payload.tweets,
            }
        default:
            return state
    }
}

export default teamReducer