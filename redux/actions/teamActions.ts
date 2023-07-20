import {FETCH_TEAM, SET_GENERAL_CONTENT} from './types'
import axios from 'axios'
import {SPORT_NAME, SPORT_SOCCER} from '../../app/constants'
import {
   getTeamEndpoint,
   getTeamHTMLContentEndpoint,
   getTeamStatEndpoint,
   getTeamTweetsEndpoint,
   getVideosEndpoint
} from '../../app/helpers/endpoints'


export const fetchTeam = (id, name = '') => async dispatch => {
    let endpoints = [
        getTeamHTMLContentEndpoint(id),
        getTeamEndpoint(id),
    ]

    if (SPORT_NAME === SPORT_SOCCER) endpoints.push(getTeamTweetsEndpoint(id), getTeamStatEndpoint(id, 0))

    await Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(async (res) => {
        await dispatch({
            type:SET_GENERAL_CONTENT,
            payload: null,
        })
        await dispatch({
            type: FETCH_TEAM,
            payload: {
                content: res[0].data,
                ...res[1].data,
                tweets: res[2]?.data ?? [],
                stats: res[3]?.data ?? []
            }
        })
    }).catch(e => {
        console.error(e)
    })

}