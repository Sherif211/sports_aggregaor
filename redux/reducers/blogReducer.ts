import {FETCH_BLOG, FETCH_BLOGS} from '../actions/types'

const initialState = {
    blogs: [],
    blog: null
}
const blogReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BLOGS:
            return {
                ...state,
                ...action.payload
            }
        case FETCH_BLOG:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export default blogReducer