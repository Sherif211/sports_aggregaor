import {FETCH_BLOG, FETCH_BLOGS, SET_GENERAL_CONTENT} from './types'
import axios from 'axios'
import {getBlogEndpoint, getBlogsEndpoint} from '../../app/helpers/endpoints'


export const fetchBlogs = () => async dispatch => {

    await axios.get(getBlogsEndpoint()).then(async (res) => {
        await dispatch({
            type:SET_GENERAL_CONTENT,
            payload: null,
        })
        await dispatch({
            type: FETCH_BLOGS,
            payload: {
                blogs: res.data
            }
        })
    }).catch(e => {
        console.error(e)
    })

}


export const fetchBlog = (slug: string | string[]) => async dispatch => {

    await axios.get(getBlogEndpoint(slug)).then(async (res) => {
        await dispatch({
            type:SET_GENERAL_CONTENT,
            payload: null,
        })
        await dispatch({
            type: FETCH_BLOG,
            payload: {
                blog: res.data
            }
        })
    }).catch(e => {
        console.error(e)
    })

}