import { SET_GENERAL_CONTENT} from '../actions/types'

const initialState = {
    content: null,
}
const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_GENERAL_CONTENT:
            return {
                content:action.payload
            }
        default:
            return state
    }
}

export default newsReducer