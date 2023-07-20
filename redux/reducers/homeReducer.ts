import {FETCH_HOME_DATA, SET_HEADER_LINKS} from '../actions/types'

const initialState = {
    content: null,
    blogs: [],
    news: null,
    tweets: [],
    leagues: [],
    standings: [],
    topPlayers: [],
    titleEventTeamsStanding: [],
    driverStanding: [],
    weeks: [],
    selectedWeek: null,
    loading: false,
    headerLinks: []
}
const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_HOME_DATA:
            return {
                ...state,
                ...action.payload
            }
        case SET_HEADER_LINKS:
            return {
                ...state,
                headerLinks: action.payload
            }
        default:
            return state
    }
}

export default homeReducer