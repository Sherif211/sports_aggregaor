import {FETCH_WORLD_CUP_EVENTS} from './types'
import {getMatchesOfWorldCupEndpoint} from '../../app/helpers/endpoints'
import ApiInterface from '../../app/helpers/ApiInterface'


export const fetchWorldCupEvents = (date) => async dispatch => {
   await ApiInterface.instance.get(getMatchesOfWorldCupEndpoint(date))
      .then(async res => {
         await dispatch({
            type: FETCH_WORLD_CUP_EVENTS,
            payload: res.data
         })
      }).catch(e => {
         console.error(e)
      })

}

