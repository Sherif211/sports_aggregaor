import {FETCH_LEAGUE, FETCH_LEAGUE_MATCHES, FETCH_LEAGUE_PAGE_DATA, FETCH_LEAGUES, SET_GENERAL_CONTENT} from './types'
import ApiInterface from '../../app/helpers/ApiInterface'
import axios from 'axios'
import {
    MOTORSPORT_STANDINGS_COMPETITOR_TYPE,
    MOTORSPORT_STANDINGS_TEAM_TYPE,
    SPORT_AMERICAN_FOOTBALL,
    SPORT_BASKETBALL,
    SPORT_MOTORSPORT,
    SPORT_NAME,
    SPORT_SOCCER
} from '../../app/constants'
import {
    getLeagueEndpoint,
    getLeagueHTMLContentEndpoint,
    getLeagueStandingEndpoint,
    getLeagueTweetsEndpoint,
    getMatchesOfLeagueEndpoint,
    getTopMatchesOfLeaguesEndpoint,
    getVideosEndpoint, getWeekScheduleEndpoint
} from '../../app/helpers/endpoints'


export const fetchLeaguePageData = (leagueId, date, name = '') => async dispatch => {
    let league = null
    let seasonId

    await ApiInterface.instance.get(getLeagueEndpoint(leagueId)).then(async res => {
        seasonId = res.data.currentSeasonId ?? res.data.seasons?.[0]?.id ?? 0
        league = res.data.tournament ?? res.data
    }).catch(e => {
        console.error(e)
    })

    let endpoints = [
        getLeagueHTMLContentEndpoint(leagueId),
        getLeagueTweetsEndpoint(leagueId),
        getMatchesOfLeagueEndpoint(leagueId, seasonId, date)
    ]

    if ([SPORT_SOCCER, SPORT_BASKETBALL, SPORT_AMERICAN_FOOTBALL].includes(SPORT_NAME)) {
        endpoints.push(getLeagueStandingEndpoint(leagueId, seasonId))
    }

    if ([SPORT_MOTORSPORT].includes(SPORT_NAME)) {
        endpoints.push(getLeagueStandingEndpoint(leagueId, null, MOTORSPORT_STANDINGS_COMPETITOR_TYPE))
        endpoints.push(getLeagueStandingEndpoint(leagueId, null, MOTORSPORT_STANDINGS_TEAM_TYPE))
    }

    await Promise.all(endpoints.map(async endpoint => await ApiInterface.instance.get(endpoint))).then(async (res) => {
        const standingTitles = []
        res[3]?.data.standingsTables?.forEach(item => standingTitles.push(item.name))
        dispatch({
            type: FETCH_LEAGUE,
            payload: league
        })
        await dispatch({
            type:SET_GENERAL_CONTENT,
            payload: res[0].data,

        })
        dispatch({
            type: FETCH_LEAGUE_PAGE_DATA,
            payload: {
                content: res[0].data,
                videos: res[1]?.data?.data ?? [],
                tweets: res[1]?.data ?? [],
                matches: res[2].data,
                standings: res[3]?.data.standingsTables ?? [],
                standingTitles: standingTitles,
                driversStandings: SPORT_MOTORSPORT === SPORT_NAME ? res[3]?.data.standings ?? [] : [],
                teamsStandings: SPORT_MOTORSPORT === SPORT_NAME ? res[4]?.data.standings ?? [] : []
            }
        })
    }).catch(e => {
        console.error(e)
    })

}

export const fetchTopLeagues = (endpoint, date) => async dispatch => {
    await axios.get(getTopMatchesOfLeaguesEndpoint(date, endpoint))
        .then(async res => {
            await dispatch({
                type: FETCH_LEAGUES,
                payload: res.data.top ?? res.data
            })
        }).catch(e => {
            console.error(e)
        })
}
export const fetchTopLeaguesByWeek = (weekId) => async dispatch => {
    await axios.get(getWeekScheduleEndpoint(weekId))
        .then(async res => {
            await dispatch({
                type: FETCH_LEAGUES,
                payload:  res.data
            })
        }).catch(e => {
            console.error(e)
        })
}

export const fetchMatchesOfLeagues = (leagueId, date, seasonId) => async dispatch => {
    await ApiInterface.instance.get(getMatchesOfLeagueEndpoint(leagueId, seasonId, date))
        .then(async res => {
            await dispatch({
                type: FETCH_LEAGUE_MATCHES,
                payload: res.data
            })
        }).catch(e => {
            console.error(e)
        })
}