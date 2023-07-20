import {FETCH_LEAGUE, FETCH_LEAGUE_MATCHES, FETCH_LEAGUE_PAGE_DATA, FETCH_LEAGUES} from '../actions/types'

const initialState = {
    leagues: [],
    league: {},
    matches: [],
    videos: [],
    tweets: [],
    standings: [],
    standingTitles: [],
    teamsStandings: [],
    driversStandings: [],
    content: null,
    loading: false
}
const leagueReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_LEAGUES:
            return {
                ...state,
                leagues: action.payload
            }
        case FETCH_LEAGUE:
            return {
                ...state,
                league: action.payload
            }
        case FETCH_LEAGUE_MATCHES:
            return {
                ...state,
                matches: action.payload
            }
        case FETCH_LEAGUE_PAGE_DATA:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export default leagueReducer