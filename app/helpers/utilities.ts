import {APP_NAME, DOMAIN, LEAGUE_BASE_ROUTE, TEAM_BASE_ROUTE} from '../constants'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(relativeTime)

const sportName = process.env.NEXT_PUBLIC_SPORT

export const timestampToTime = (timestamp: number) => {
    return new Date(timestamp).toISOString().slice(-13, -8)
}

export const setUrlStyle = (str: string): string => {
    return str.replace(/(\b(https?|ftp|file):\/\/[\-A-Z0-9+&@#\/%?=~_|!:,.;]*[\-A-Z09+&@#\/%=~_|])/img, '<span class="link">$1</span>')
}

export const setHashtagStyle = (str: string): string => {
    return str.replace(/(^|\s)(#[a-zA-Z\d_-]+)/ig, '$1<span class="link">$2</span>')
}

export const setUsernameStyle = (str: string): string => {
    return str.replace(/(^|)(@[a-zA-Z0-9\d-]+)/g, '$1<span class="link">$2</span>')
}

export const setUrlHashtagStyle = (str: string): string => {
    return setUsernameStyle(setHashtagStyle(setUrlStyle(str)))
}

export const stringToSlug = (str: string) => {
    str = str.replace(/^\s+|\s+$/g, '')
    str = str.toLowerCase()

    const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;'
    const to = 'aaaaeeeeiiiioooouuuunc------'
    for (let i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
    }

    str = str.replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')

    return str
}

export const generateHref = (page, slug, id, full = false) => {
    return `${full ? DOMAIN : ''}/${page}/${slug}-live-streams/${id}`
}

export const generateTeamHref = (slug, id, full = false) => {
    return `${full ? DOMAIN : ''}/${TEAM_BASE_ROUTE}/${slug}-live-streams/${id}`
}

export const generateLeagueHref = (slug, id, full = false) => {
    return `${full ? DOMAIN : ''}/${LEAGUE_BASE_ROUTE}/${slug}-live-streams/${id}`
}

export const generateBlogHref = (slug: string) => {
    return `/${process.env.NEXT_PUBLIC_BLOG_BASE_ROUTE}/${slug}`
}


export const generateNewsHref = (slug: string) => {
    return `/${process.env.NEXT_PUBLIC_NEWS_BASE_ROUTE}/${slug}`
}

export const convertAgoFormat = (time, suffix = false) => {
    return dayjs(time).fromNow(suffix)
}

export const generateEventHref = (title, slug, id, full = false) => {
    return `${full ? DOMAIN : ''}/${!!title ? process.env.NEXT_PUBLIC_TITLE_EVENT_PREFIX : process.env.NEXT_PUBLIC_EVENT_PREFIX}/${slug}/${id}`
}
export const generateGeneralEventHref = (title, slug, full = false) => {
    return `${full ? DOMAIN : ''}/${process.env.NEXT_PUBLIC_GENERAL_GAME_PAGE_SLUG}/${slug}${process.env.NEXT_PUBLIC_GENERAL_GAME_PAGE_POST_FIX ? process.env.NEXT_PUBLIC_GENERAL_GAME_PAGE_POST_FIX : ''  }`
}

export const getDate = (date = undefined, format = 'YYYY-MM-DD') => {
    return dayjs(date).format(format)
}

export const generateMatchTitle = (event) => {
    if (event.title) {
        return event.title + ' live stream - ' + APP_NAME ?? sportName + ' streams'
    } else {
        return event.homeTeam.name + ' vs ' + event.awayTeam.name + ' live stream - ' + sportName + ' streams'
    }
}

export const generateMatchDesc = (event) => {
    if (event.title) {
        return 'Watch ' + event.title + ' live streaming online for free on ' + APP_NAME
    } else {
        return 'Watch ' + event.homeTeam.name + ' VS ' + event.awayTeam.name + ' live streaming online for free on ' + APP_NAME
    }
}

export const isValidArray = (array) => {
    return Array.isArray(array) && array.length !== 0
}

export const secondToMinute = (seconds: number) => {
    if (!Number.isInteger(seconds)) return 0
    return `${~~(seconds / 60)}:${seconds % 60 || '00'}`
}

export const extractNumber = (word: string): number => {
    if (word.includes('one')) return 1
    if (word.includes('two')) return 2
    if (word.includes('three')) return 3
}

export const passFailFilterArray = (array, isValid): [[], []] => {
    return array.reduce(([pass, fail], elem) => {
        return isValid(elem) ? [[...pass, elem], fail] : [pass, [...fail, elem]]
    }, [[], []])
}

export const getTimezone = (date = null) => {
    return date ? dayjs(date).tz(process.env.NEXT_PUBLIC_TIMEZONE) : dayjs().tz(process.env.NEXT_PUBLIC_TIMEZONE)
}

export const getNextDayDate = (date, days) => {
    return dayjs(date).add(days, 'day').tz(process.env.NEXT_PUBLIC_TIMEZONE)
}

export const getPreDayDate = (date, days) => {
    return dayjs(date).subtract(days, 'day').tz(process.env.NEXT_PUBLIC_TIMEZONE)
}

export const twoDigitNumber = (str) => {
    str = str?.toString() ?? ''
    if (str.length === 1)
        return '0' + str
    return str
}

export const timestampTo24FormatTime = (timestamp: number) => {
    return dayjs(timestamp * 1000).tz(process.env.NEXT_PUBLIC_TIMEZONE).local().format('HH:mm')
}

export const calculateTimeLeft = (timestamp, stringFormat = false) => {
    const difference = +new Date(timestamp * 1000) - +new Date()
    let timeLeft = {}

    if (difference > 0) {
        timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
        }
    }
    if (stringFormat) {
        const hours = timeLeft['hours'] ? twoDigitNumber(timeLeft['hours']) + ':' : ''
        return hours + twoDigitNumber(timeLeft['minutes'])
    }
    return timeLeft
}

export const modifyPhraseForSearch = (phrase: string) => {
    let returnString = phrase.toLowerCase()
    returnString = returnString.replace(/ö/g, 'o')
    returnString = returnString.replace(/ç/g, 'c')
    returnString = returnString.replace(/ş/g, 's')
    returnString = returnString.replace(/ı/g, 'i')
    returnString = returnString.replace(/ğ/g, 'g')
    returnString = returnString.replace(/ü/g, 'u')
    return returnString
}



