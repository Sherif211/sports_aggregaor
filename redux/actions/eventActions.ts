import {FETCH_EVENT_DATA, FETCH_LINEUPS_DATA, SET_GENERAL_CONTENT} from './types'
import ApiInterface from '../../app/helpers/ApiInterface'
import {
    HAVE_LINEUP_SPORTS,
    SPORT_AMERICAN_FOOTBALL,
    SPORT_BASEBALL,
    SPORT_BASKETBALL,
    SPORT_ICE_HOCKEY,
    SPORT_MOTORSPORT,
    SPORT_NAME,
    SPORT_SOCCER
} from '../../app/constants'
import {
    getEventEndpoint,
    getEventHTMLContentEndpoint,
    getEventTweetsEndpoint,
    getHeadToHeadEndpoint,
    getIncidentsEndpoint,
    getLineUpsEndpoint,
    getStatsEndpoint,
    getSubStageStandingEndpoint,
    getSubStagesTitleEventEndpoint,
    getTitleEventEndpoint, getTitleEventHTMLContentEndpoint,
    getTitleEventInfoEndpoint,
    getTitleEventInfoImageEndpoint
} from '../../app/helpers/endpoints'

export const fetchEventData = (slug, id) => async dispatch => {
    const res =  await ApiInterface.instance.get(getEventEndpoint(slug, id));
    const mainId = id;
    id = res.data.event.id;
    let endpoints = [
        getEventEndpoint(slug, mainId),
        getEventHTMLContentEndpoint(id)
    ]
    console.log(getEventEndpoint(slug, id));
    if (SPORT_NAME === SPORT_SOCCER) {
        endpoints.push(getStatsEndpoint(id), getEventTweetsEndpoint(id), getHeadToHeadEndpoint(id))
    } else if ([SPORT_AMERICAN_FOOTBALL, SPORT_BASKETBALL, SPORT_BASEBALL, SPORT_ICE_HOCKEY].includes(SPORT_NAME)) {
        endpoints.push(getStatsEndpoint(id), getIncidentsEndpoint(id))
    } else if (SPORT_NAME === SPORT_MOTORSPORT) {
        endpoints.push(getSubStagesTitleEventEndpoint(id), getTitleEventInfoImageEndpoint(id), getTitleEventInfoImageEndpoint(id))
    }
    await Promise.all(endpoints.map(async endpoint => await ApiInterface.instance.get(endpoint))).then(async (res) => {
        await dispatch({
            type:SET_GENERAL_CONTENT,
            payload: res[1]?.data ?? null,
        })

        await dispatch({
            type: FETCH_EVENT_DATA,
            payload: {
                event: res[0]?.data?.event,
                incidents: res[0].data?.event?.incidents ? res[0].data.incidents : (res[3]?.data?.incidents ?? []),
                content: res[1]?.data ?? null,
                stats: res[2]?.data?.statistics ?? [],
                tweets: SPORT_NAME === SPORT_SOCCER ? res[3]?.data ?? [] : [],
                h2h: res[4]?.data ?? null
            }
        })
    }).catch(e => {
    })

}

export const fetchLineupsData = (eventId) => async dispatch => {
    if (HAVE_LINEUP_SPORTS.includes(SPORT_NAME)) {
        await ApiInterface.instance.get(getLineUpsEndpoint(eventId))
            .then(async res => {
                await dispatch({
                    type: FETCH_LINEUPS_DATA,
                    payload: res.data ?? null
                })
            })
            .catch((e) => {
                console.error(e)
            })
    }


}


export const fetchStandingOfStage = (id) => async dispatch => {
    await ApiInterface.instance.get(getSubStageStandingEndpoint(id))
        .then(async res => {
            await dispatch({
                type: FETCH_EVENT_DATA,
                payload: {
                    raceStanding: res?.data?.standings
                }
            })
        })
        .catch((e) => {
            console.error(e)
        })

}

export const fetchTitleEventData = (slug, id) => async dispatch => {
    let subStages = []
    await ApiInterface.instance.get(getSubStagesTitleEventEndpoint(id))
        .then(async res => {
            subStages = res.data.stages
        })
        .catch((e) => {
            console.error(e)
        })

    const indexOfNotStarted = subStages?.findIndex(item => item.status.type === 'notstarted')
    let selectedIndex = 0
    if (indexOfNotStarted !== -1 && indexOfNotStarted > 1) {
        selectedIndex = indexOfNotStarted - 1
    }

    const endpoints = [
        getTitleEventEndpoint(id),
        getSubStageStandingEndpoint(subStages[selectedIndex]?.id),
        getTitleEventInfoEndpoint(id),
        getTitleEventHTMLContentEndpoint(id)
    ]
    await Promise.all(endpoints.map(async endpoint => await ApiInterface.instance.get(endpoint))).then(async (res) => {
        await dispatch({
            type:SET_GENERAL_CONTENT,
            payload: res[3]?.data ?? null,
        })

        await dispatch({
            type: FETCH_EVENT_DATA,
            payload: {
                event: res[0]?.data,
                raceStages: subStages,
                raceStanding: res[1]?.data?.standings ?? null,
                titleEventInfo: res[2]?.data.stage ?? null,
                content: res[3]?.data ?? null,
            }
        })
    }).catch(e => {
        console.error(e)
    })
}