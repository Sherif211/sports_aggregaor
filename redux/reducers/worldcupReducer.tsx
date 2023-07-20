import {FETCH_WORLD_CUP_EVENTS} from '../actions/types'

const initialState = {
   events: [],
   loading: false
}
const worldcupReducer = (state = initialState, action) => {
   switch (action.type) {
      case FETCH_WORLD_CUP_EVENTS:
         return {
            ...state,
            events: action.payload
         }
      default:
         return state
   }
}

export default worldcupReducer