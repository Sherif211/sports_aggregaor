import {FETCH_NEWS, FETCH_NEW, SET_GENERAL_CONTENT} from './types'
import axios from 'axios'
import {getNewEndpoint, getNewsEndpoint} from '../../app/helpers/endpoints'


export const fetchNews = () => async dispatch => {

    await axios.get(getNewsEndpoint()).then(async (res) => {
        await dispatch({
            type:SET_GENERAL_CONTENT,
            payload: null,
        })
        await dispatch({
            type: FETCH_NEWS,
            payload: {
                news: res.data
            }
        })
    }).catch(e => {
        console.error(e)
    })

}


export const fetchNew = (slug: string | string[]) => async dispatch => {

    await axios.get(getNewEndpoint(slug)).then(async (res) => {
        await dispatch({
            type:SET_GENERAL_CONTENT,
            payload: null,
        })
        await dispatch({
            type: FETCH_NEW,
            payload: {
                singleNews: res.data?.data ?? null
            }
        })
    }).catch(e => {
        console.error(e)
    })

}