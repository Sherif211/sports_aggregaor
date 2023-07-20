import {SET_SPORT_DATA} from './types'
import {SPORT_NAME} from '../../app/constants'
import {getTimezone} from '../../app/helpers/utilities'


export const setSportData = (sport = SPORT_NAME) => dispatch => {
    const sportData = {
        basketball: {
            name: 'NBA',
            timezone: 'America/New_York',
            slug: sport,
            endpoint: '/api/nba-tournaments?date=',
            uniqueID: 132,
            mainID: 320,
            founder: '/r/NBAStreams',
            logo: 'NBASTREAMS'
        },
        'american-football': {
            slug: sport,
            name: 'nfl',
            timezone: 'America/New_York',
            endpoint: '/api/nfl-tournaments-without-nba?date=',
            logo: 'NFLSTREAMS',
            logoHeight: '75px',
            uniqueID: 9464,
            mainID: 90,
            logoType: 'text',
            footerLogo: '/images/logos/nfl.png',
            founder: '/r/NFLStreams'
        },
        'mma': {
            slug: sport,
            name: 'mma',
            timezone: 'America/New_York',
            endpoint: '/api/mma-tournaments?date=',
            logo: 'MMASTREAMS',
            logoHeight: '75px',
            uniqueID: 9464,
            mainID: 90,
            logoType: 'text',
            footerLogo: ''
        },
        'boxing': {
            slug: sport,
            name: 'boxing',
            timezone: 'America/New_York',
            endpoint: '/api/boxing-tournaments?date=',
            logo: 'MMASTREAMS',
            logoHeight: '75px',
            uniqueID: 9464,
            mainID: 90,
            logoType: 'text',
            footerLogo: ''
        },
        'ice-hockey': {
            slug: sport,
            name: 'nhl',
            timezone: 'America/New_York',
            endpoint: '/api/nhl-tournaments?date=',
            logo: 'NHLSTREAMS',
            uniqueID: 234,
            logoType: 'text',
            mainID: 95
        },
        'soccer': {
            slug: sport,
            name: 'Soccer',
            endpoint: '/new-api/matches?date=',
            logoWidth: 140,
            logoHeight: 30,
            logoType: 'text',
            logo: 'the name'
        },
        'baseball': {
            slug: sport,
            name: 'mlb',
            timezone: 'America/New_York',
            endpoint: '/api/mlb-tournaments?date=',
            footerLogo: '/images/logos/mlb.jpg',
            logoType: 'text',
            logo: 'MLBSTREAMS',
            uniqueID: 11205,
            mainID: 1437
        },
        'cricket': {
            slug: sport,
            name: 'cricket',
            endpoint: '/api/cricket-tournaments?date=',
            logoType: 'text',
            logo: 'CRICKET STREAMS'
        },
        'tennis': {
            slug: sport,
            name: 'tennis',
            endpoint: '/api/tennis-tournaments?date=',
            logoType: 'text',
            logo: 'TENNIS STREAMS'
        },
        'motorsport': {
            slug: sport,
            name: 'motorsport',
            endpoint: '/api/motorsport-tournaments?date='
        }
    }
    if (process.env.NEXT_PUBLIC_TIMEZONE) {
        getTimezone()
    }
    dispatch({
        type: SET_SPORT_DATA,
        payload: sportData[sport]
    })
}