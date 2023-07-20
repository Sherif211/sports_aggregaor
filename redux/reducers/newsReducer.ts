import {FETCH_NEW, FETCH_NEWS} from '../actions/types'

const initialState = {
    news: null,
    singleNews: null
}
const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_NEWS:
            return {
                ...state,
                ...action.payload
            }
        case FETCH_NEW:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export default newsReducer