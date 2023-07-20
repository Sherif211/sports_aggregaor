import {SET_SPORT_DATA} from '../actions/types'

const initialState = {
   slug: '',
   endpoint: '/top-matches/football/',
   name: '',
   sportData: null
}
const sportReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_SPORT_DATA: {
         return {
            ...state,
            slug: action.payload?.slug,
            endpoint: action.payload?.endpoint,
            sportData: action.payload
         }
      }
      default:
         return state
   }
}

export default sportReducer
