import {FETCH_HOME_DATA, FETCH_LEAGUES, SET_GENERAL_CONTENT, SET_HEADER_LINKS} from './types'
import axios from 'axios'
import {
    getBlogsEndpoint,
    getDriverStandingEndpoint,
    getFormulaTeamStandingEndpoint,
    getHomeHTMLContentEndpoint,
    getHomeStandingsEndpoint,
    getHomeTopPlayersEndpoint,
    getHomeTweetsEndpoint, getNewsEndpoint,
    getTopMatchesOfLeaguesEndpoint, getWeekScheduleEndpoint, getWeeksListEndpoint
} from '../../app/helpers/endpoints'
import {
    MAIN_SEASON_ID,
    MAIN_TOURNAMENT_ID,
    SPORT_AMERICAN_FOOTBALL,
    SPORT_BASEBALL,
    SPORT_BASKETBALL,
    SPORT_ICE_HOCKEY,
    SPORT_MOTORSPORT,
    SPORT_NAME,
    SPORT_SOCCER
} from '../../app/constants'

export const setHeaderLinks = (links) => async dispatch => {
    await dispatch({
        type:SET_HEADER_LINKS,
        payload:links
    })
}
export const fetchHomePageData = (endpoint, date) => async dispatch => {

    let endpoints = [
        getHomeHTMLContentEndpoint(),
        getTopMatchesOfLeaguesEndpoint(date, endpoint),
        getBlogsEndpoint(),
        getNewsEndpoint(),
        getHomeTweetsEndpoint()
    ]
    if (SPORT_NAME === SPORT_MOTORSPORT) {
        endpoints.push(getDriverStandingEndpoint(), getFormulaTeamStandingEndpoint())
    }
    if (SPORT_NAME === SPORT_SOCCER || (MAIN_TOURNAMENT_ID && MAIN_SEASON_ID && [SPORT_BASKETBALL, SPORT_BASEBALL, SPORT_AMERICAN_FOOTBALL, SPORT_ICE_HOCKEY].includes(SPORT_NAME))) {
        endpoints.push(getHomeStandingsEndpoint())
    }
    if ([SPORT_BASKETBALL].includes(SPORT_NAME)) {
        endpoints.push(getHomeTopPlayersEndpoint())
    }
    let weeksIndex = -1;
    if ([SPORT_AMERICAN_FOOTBALL].includes(SPORT_NAME) && process.env.NEXT_PUBLIC_LOAD_WEEKS_SLUG) {
        weeksIndex = endpoints.push(getWeeksListEndpoint()) - 1;
    }

    await Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(async (res) => {
        await dispatch({
            type:SET_GENERAL_CONTENT,
            payload:res[0].data
        })
        await dispatch({
            type: FETCH_HOME_DATA,
            payload: {
                content: res[0].data,
                blogs: res[2].data,
                news: res[3].data ?? null,
                tweets: res[4]?.data?.data ?? null,
                standings: SPORT_SOCCER === SPORT_NAME ? res[5]?.data ?? null : res[5]?.data?.standings ?? [] ?? null,
                topPlayers: [SPORT_BASKETBALL, SPORT_BASEBALL, SPORT_AMERICAN_FOOTBALL, SPORT_ICE_HOCKEY].includes(SPORT_NAME) ? res[6]?.data?.topPlayers ?? [] : [],
                driverStanding: SPORT_NAME === SPORT_MOTORSPORT ? res[5]?.data.standings ?? null : null,
                titleEventTeamsStanding: SPORT_NAME === SPORT_MOTORSPORT ? res[6]?.data.standings ?? null : null,
                weeks: [SPORT_AMERICAN_FOOTBALL].includes(SPORT_NAME) && process.env.NEXT_PUBLIC_LOAD_WEEKS_SLUG ? res[weeksIndex]?.data.weeks ?? [] : [],
                selectedWeek: [SPORT_AMERICAN_FOOTBALL].includes(SPORT_NAME) && process.env.NEXT_PUBLIC_LOAD_WEEKS_SLUG ? res[weeksIndex]?.data.currentWeek ?? null : null,
            }
        })
        if ([SPORT_AMERICAN_FOOTBALL].includes(SPORT_NAME) && process.env.NEXT_PUBLIC_LOAD_WEEKS_SLUG && res[weeksIndex]?.data.currentWeek) {

            await axios.get(getWeekScheduleEndpoint(res[weeksIndex]?.data.currentWeek.id))
                .then(res => {
                     dispatch({
                        type: FETCH_LEAGUES,
                        payload: res.data
                    })
                })

        } else {
            await dispatch({
                type: FETCH_LEAGUES,
                payload: res[1].data
            })
        }


    }).catch(e => {
        console.error(e)
    })

}

