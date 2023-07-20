import {
    MAIN_SEASON_ID,
    MAIN_TOURNAMENT_ID,
    SPORT_AMERICAN_FOOTBALL,
    SPORT_BASKETBALL,
    SPORT_MOTORSPORT,
    SPORT_NAME,
    SPORT_SOCCER,
    UNIQUE_APP_NAME
} from '../constants'

export const getHeaderLinksEndpoint = (): string => {
    return `/backlink/${UNIQUE_APP_NAME}/HEADER`
}

export const getFooterLinksEndpoint = (): string => {
    return `/backlink/${UNIQUE_APP_NAME}/FOOTER`
}

export const getVideosEndpoint = (name: string): string => {
    return `https://veddit.net/api/search?title=${name}&limit=5`
}

export const getTeamEndpoint = (id: string | number): string => {
    return `https://scdn.dev/api/team/${id}?type=${SPORT_NAME}`
}

export const getLeagueEndpoint = (id: string | number): string => {
    return SPORT_NAME === SPORT_SOCCER ? `/v2/soccer/league/${id}?type=${SPORT_NAME}` : `/tournament/seasons/${id}?type=${SPORT_NAME}`
}

export const getMatchesOfLeagueEndpoint = (id, seasonId, date: string): string => {
    if (SPORT_NAME === SPORT_SOCCER) {
        return `v2/soccer/league/fixtures/${id}/${seasonId}/${date}`
    } else if (SPORT_NAME === SPORT_MOTORSPORT) {
        return `https://scdn.dev/api/tournament/matches/${id}/${date}/${seasonId}`
    }
    return `/tournament/matches/${id}/${date}/${seasonId}`
}

export const getTopMatchesOfLeaguesEndpoint = (date: string, endpoint: string): string => {
    if (SPORT_NAME === SPORT_SOCCER) {
        return `https://scdn.dev/api/v2/soccer/soccerstreams/fixtures/${date}?timeZone=150`
    } else if (SPORT_NAME === SPORT_MOTORSPORT) {
        return `https://scdn.dev/api/motorsport-tournaments?date=${date}`
    }
    return `https://scdn.dev${endpoint}${date}`
}

export const getMatchesOfWorldCupEndpoint = (date: string) => {
    return `https://scdn.dev/api/v2/soccer/soccerstreams/world-cup-fixtures/${date}?timeZone=150`
}

export const getTitleEventEndpoint = (id: string | number): string => {
    return `/title-event/${id}`
}

export const getEventEndpoint = (slug: string, id: string | number): string => {
    if (id=="general")
        return `https://scdn.dev/api/event/general-by-teams-slug/${slug}?type=${SPORT_NAME}`;
    return `https://scdn.dev/api/event/general/${slug}/${id}?type=${SPORT_NAME}`
}

export const getLeagueStandingEndpoint = (leagueId, seasonId = null, type = null) => {
    if ([SPORT_SOCCER, SPORT_BASKETBALL, SPORT_AMERICAN_FOOTBALL].includes(SPORT_NAME)) {
        return `/standing/tables/${leagueId}/${seasonId}?type=${SPORT_NAME}`
    } else if ([SPORT_MOTORSPORT].includes(SPORT_NAME)) {
        return `https://scdn.dev/api/motorsport-standings-${type}-league/${leagueId}`
    }
}

export const getIncidentsEndpoint = (id): string => {
    return `https://scdn.dev/api/event/incidents-main/${id}`
}


/* TWEETS  -------------------------------------------------------------------------------- */
export const getTeamTweetsEndpoint = (id: string | number): string => {
    return `https://scdn.dev/api/team-soccer/tweets-v2/${id}`
}

export const getEventTweetsEndpoint = (id: string | number): string => {
    return `https://scdn.dev/api/event/tweets-v2/${id}?sport=${SPORT_NAME}`
}

export const getLeagueTweetsEndpoint = (id: string | number): string => {
    return SPORT_NAME === SPORT_SOCCER ? `https://scdn.dev/api/tournament-soccer/tweets-v2/${id}` : `https://scdn.dev/api/tournament/tweets-v2/${id}?sport=${SPORT_NAME}`
}


/* HTML CONTENT --------------------------------------------------------------------------- */
export const getTeamHTMLContentEndpoint = (id: number | string): string => {
    return `https://scdn.dev/api/site-content/${UNIQUE_APP_NAME}/team/${id}/${SPORT_NAME}`
}

export const getLeagueHTMLContentEndpoint = (id: number | string): string => {
    return `https://scdn.dev/api/site-content/${UNIQUE_APP_NAME}/league/${id}/${SPORT_NAME}`
}

export const getEventHTMLContentEndpoint = (id: number | string): string => {
    return `https://scdn.dev/api/site-content/${UNIQUE_APP_NAME}/event/${id}/${SPORT_NAME}`
}
export const getTitleEventHTMLContentEndpoint = (id: number | string): string => {
    return `https://scdn.dev/api/site-content/${UNIQUE_APP_NAME}/title-event/${id}/${SPORT_NAME}`
}
export const getHomeHTMLContentEndpoint = (): string => {
    return `https://scdn.dev/api/site-content/${UNIQUE_APP_NAME}/home`
}


/* SOCCER ENDPOINT ------------------------------------------------------------------------- */

export const getStatsEndpoint = (id: string | number): string => {
    return SPORT_NAME === SPORT_SOCCER ? `https://scdn.dev/api/event/stats/${id}?sport=${SPORT_NAME}` : `https://scdn.dev/api/event/stats-main/${id}`
}

export const getHeadToHeadEndpoint = (id: string | number): string => {
    return `https://scdn.dev/api/event/headToHead/${id}`
}

export const getLineUpsEndpoint = (eventId: string | number): string => {
    return SPORT_NAME === SPORT_SOCCER ? `/event/lineups/${eventId}?type=${SPORT_NAME}` : `https://scdn.dev/api/event/lineups-main/${eventId}`
}


export const getTeamStatEndpoint = (teamId: string | number, seasonId: string | number): string => {
    return `https://scdn.dev/api/team/stats/${teamId}/${seasonId}`
}


export const getBlogsEndpoint = () => {
    return `https://scdn.dev/api/site-blog/${UNIQUE_APP_NAME}/posts`
}


export const getBlogEndpoint = (slug: string | string[]) => {
    return `https://scdn.dev/api/site-blog/${slug}/post`
}

/* News */

export const getNewsEndpoint = (q = '', order = '', categoryId = '', page: number|string = 1): string => {
    return `https://srv.sportlane.org/api/v2/news/${SPORT_NAME === SPORT_SOCCER ? 'football' : SPORT_NAME}?q=${q}&order=${order}&categoryId=${categoryId}&page=${page}&siteName=${UNIQUE_APP_NAME}`
}
export const getNewEndpoint = (slug): string => {
    return `https://srv.sportlane.org/api/v2/news/${slug}/single`
}

export const getHomeStandingsEndpoint = () => {
    return SPORT_NAME === SPORT_SOCCER ? 'https://scdn.dev/api/standing-tables/popular-leagues' : `https://scdn.dev/api/standing/tables-main/${MAIN_TOURNAMENT_ID}/${MAIN_SEASON_ID}`
}

export const getHomeTopPlayersEndpoint = () => {
    return `https://api.sofascore.com/api/v1/sport/${SPORT_NAME}/trending-top-players`
}
export const getWeeksListEndpoint = () => {
    return `https://scdn.dev/api/v2/league/weeks/${process.env.NEXT_PUBLIC_LOAD_WEEKS_SLUG}`
}

export const getWeekScheduleEndpoint = (weekId) => {
    return `https://scdn.dev/api/v2/league/weeks/${process.env.NEXT_PUBLIC_LOAD_WEEKS_SLUG}/schedule-v1/${weekId}`
}

export const getHomeTweetsEndpoint = () => {
    return `https://srv.sportlane.org/api/v2/sport/${SPORT_NAME === 'soccer' ? 'football' : SPORT_NAME}/tweets`
}

/* MOTORSPORT ENDPOINT ------------------------------------------------------------------------- */

export const getDriverStandingEndpoint = (): string => {
    return 'https://scdn.dev/api/formula-1-standings-competitor'
}


export const getFormulaTeamStandingEndpoint = (): string => {
    return 'https://scdn.dev/api/formula-1-standings-team'
}

export const getTitleEventInfoEndpoint = (id: string | number): string => {
    return `https://scdn.dev/api/formula-1/${id}/info`
}

export const getTitleEventInfoImageEndpoint = (id: string | number): string => {
    return `https://scdn.dev/api/formula-1/${id}/image`
}

export const getSubStagesTitleEventEndpoint = (id: string | number): string => {
    return `https://scdn.dev/api/formula-1/${id}/substages`
}

export const getSubStageStandingEndpoint = (id: string | number): string => {
    return `https://scdn.dev/api/formula-1-standings-competitor?substage=${id}`
}

/* SITEMAPS ENDPOINT ------------------------------------------------------------------------- */

export const getLeagueListEndpoint = () => {
    return `https://scdn.dev/api/top-leagues/${SPORT_NAME}`
}


export const getPopularEventListEndpoint = () => {
    return `https://scdn.dev/api/popular-events/${SPORT_NAME}`
}