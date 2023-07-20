import {applyMiddleware, combineReducers, createStore} from 'redux'
import {createWrapper, HYDRATE} from 'next-redux-wrapper'
import thunkMiddleware from 'redux-thunk'
import event from './redux/reducers/eventReducer'
import sport from './redux/reducers/sportReducer'
import team from './redux/reducers/teamReducer'
import league from './redux/reducers/leagueReducer'
import blog from './redux/reducers/blogReducer'
import home from './redux/reducers/homeReducer'
import worldcup from './redux/reducers/worldcupReducer'
import news from './redux/reducers/newsReducer'
import general from './redux/reducers/generalReducer'

const bindMiddleware = (middleware) => {
    if (process.env.NODE_ENV !== 'production') {
        const {composeWithDevTools} = require('redux-devtools-extension')
        return composeWithDevTools(applyMiddleware(...middleware))
    }
    return applyMiddleware(...middleware)
}


const combinedReducer = combineReducers({
    home,
    event,
    sport,
    team,
    league,
    worldcup,
    blog,
    general,
    news
})


const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload // apply delta from hydration
        }
        return nextState
    } else {
        return combinedReducer(state, action)
    }
}
const store = createStore(reducer, bindMiddleware([thunkMiddleware]))
const initStore = () => {
    return store
}

export const wrapper = createWrapper(initStore, {
    debug: false
})
export default store