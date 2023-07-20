import dynamic from 'next/dynamic'
import {connect} from 'react-redux'
import {wrapper} from '../../store'
import {fetchLeaguePageData, fetchMatchesOfLeagues} from '../../redux/actions/leagueActions'
import {FC, useEffect, useState} from 'react'
import LeagueHeader from '../../app/components/league/LeagueHeader'
import {Col, Row} from 'react-bootstrap'
import Card from '../../app/components/card/Card'
import Calendar from '../../app/components/day-calendar/Calendar'
import Tweets from '../../app/components/tweet/Tweets'
import MatchesTable from '../../app/components/match/MatchesTable'
import LeaguePageSeo from '../../app/seo/LeaguePageSEO'
import {generateLeagueHref, getTimezone, isValidArray} from '../../app/helpers/utilities'
import {CALLED_EVENT, SPORT_MOTORSPORT, SPORT_NAME} from '../../app/constants'
import Standings from '../../app/components/motorsport/home-page/Standings'
import RacesCalendar from "../../app/components/motorsport/RacesCalendar";

const VideoSlider = dynamic(() => import('../../app/components/videos/VideoSlider')) as FC<any>
const Loading = dynamic(() => import('../../app/components/loading/Loading')) as FC<any>
const LeagueStanding = dynamic(() => import('../../app/components/standing/LeagueStanding')) as FC<any>

const League = ({
                    league,
                    matches,
                    videos,
                    content,
                    standings,
                    standingTitles,
                    tweets,
                    fetchMatchesOfLeagues,
                    paths,
                    teamsStandings,
                    driversStandings
                }) => {
    const [loading, setLoading] = useState(false)
    const [date, setDate] = useState(getTimezone())

    const fetchData = (targetDate) => {
        setLoading(true)
        if (SPORT_NAME === SPORT_MOTORSPORT) {
            const seasonId = league.currentSeasonId ?? league.seasons?.[0]?.id ?? 0
            fetchMatchesOfLeagues(league.id, targetDate, seasonId)
        } else {
            const formatDate = targetDate.format('YYYY-MM-DD')
            const seasonId = league.currentSeasonId ?? league.seasons?.[0]?.id ?? 0
            fetchMatchesOfLeagues(league.id, formatDate, seasonId)
        }
    }

    const onChangeCalendar = (date) => {
        if (SPORT_NAME === SPORT_MOTORSPORT) {
            fetchData(date)
        } else {
            fetchData(date)
            setDate(date)
        }
    }

    useEffect(() => {
        setLoading(false)
    }, [matches])

    return <>
        <LeaguePageSeo league={league} content={content} paths={paths}/>
        <div className="leaguePage">
            <Col md={8}>
                {SPORT_NAME === SPORT_MOTORSPORT ? <RacesCalendar onChange={onChangeCalendar}/> : <Calendar onChange={onChangeCalendar} date={date}/>}
            </Col>
            <Col md={4}/>
            <Row>
                <Col md={8} className="mb-3">
                    <Card className="mb-3">
                        <Loading loading={loading}/>
                        <div className="leaguePage__matches">
                            {
                                matches.length > 0 ? <MatchesTable
                                    matches={matches}/> : `There are no ${CALLED_EVENT[1] ?? 'matches'} today`
                            }
                        </div>
                    </Card>
                    <Card className="my-3" dangerouslySetInnerHTML={{__html: content?.content ?? ''}}/>
                    {isValidArray(standings) && <LeagueStanding standings={standings}
                                                                standingTitles={standingTitles}
                                                                defaultTitle={league?.name}/>}
                    <VideoSlider videos={videos}/>
                </Col>
                <Col md={4}>
                    <Standings driversStandings={driversStandings} teamsStandings={teamsStandings}/>
                    <Tweets tweets={tweets}/>
                </Col>
            </Row>
        </div>
    </>

}

// @ts-ignore
export const getServerSideProps = wrapper.getServerSideProps(store => async context => {
    const {path} = context.params
    const date = getTimezone()
    const formatDate = SPORT_NAME === SPORT_MOTORSPORT ? 'live' : date.format('YYYY-MM-DD')
    const name = (path[0].replace('-live-streams', '')).replace(/-/g, ' ')

    await store.dispatch(fetchLeaguePageData(path[1], formatDate, name))
    return {
        props: {
            slug: path[1],
            paths: [
                {
                    name: `${store.getState().league.league?.name || name} league`,
                    url: generateLeagueHref(path[0], path[1], true)
                }
            ]
        }
    }
})

const mapDispatchToProps = dispatch => ({
    fetchMatchesOfLeagues: (leagueId, date, sport) => dispatch(fetchMatchesOfLeagues(leagueId, date, sport))
})
const mapStateToProps = state => ({
    league: state.league.league,
    matches: state.league.matches,
    videos: state.league.videos,
    standings: state.league.standings,
    standingTitles: state.league.standingTitles,
    tweets: state.league.tweets,
    content: state.league.content,
    loading: state.league.loading,
    driversStandings: state.league.driversStandings,
    teamsStandings: state.league.teamsStandings
})
export default connect(mapStateToProps, mapDispatchToProps)(League)
