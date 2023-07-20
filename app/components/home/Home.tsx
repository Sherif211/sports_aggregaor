import dynamic from 'next/dynamic'
import {connect} from 'react-redux'
import Calendar from '../day-calendar/Calendar'
import {FC, memo, useEffect, useState} from 'react'
import Matches from '../match/Matches'
import Card from '../card/Card'
import {fetchTopLeagues, fetchTopLeaguesByWeek} from '../../../redux/actions/leagueActions'
import {getTimezone, modifyPhraseForSearch} from '../../helpers/utilities'
import Tweets from '../tweet/Tweets'
import Standings from './Standings'
import Blogs from './Blogs'
import {FormControl} from 'react-bootstrap'
import Search from '../icons/Search'
import {
    EVENT_SEARCH_INPUT_PLACEHOLDER,
    SPORT_AMERICAN_FOOTBALL,
    SPORT_BASEBALL,
    SPORT_BASKETBALL,
    SPORT_ICE_HOCKEY, SPORT_MOTORSPORT,
    SPORT_NAME,
    SPORT_SOCCER
} from '../../constants'
import DriversStanding from '../motorsport/home-page/Standings'
import StandingsTypeTwo from './StandingsTypeTwo'
import TopPlayers from './TopPlayers'
import RacesCalendar from "../motorsport/RacesCalendar";
import PostItem from "../post/PostItem";
import WeekSelector from "../weeks/WeekSelector";
import SportsIcons from "../layout/SportsIcons";

const Loading = dynamic(() => import('../loading/Loading')) as FC<any>

const Home = ({
                  matches,
                  content,
                  endpoint,
                  fetchTopLeagues,
                  blogs,
                  news,
                  tweets,
                  standings,
                  driversStandings,
                  teamsStandings,
                  selectedWeek,
                  fetchTopLeaguesByWeek,
                  weeks
              }) => {
    const [filteredMatches, setFilteredMatches] = useState(matches)
    const [loading, setLoading] = useState(false)
    const [date, setDate] = useState(getTimezone())
    const fetchMatches = (targetDate) => {
        setLoading(true)
        if (SPORT_NAME === SPORT_MOTORSPORT) {
            fetchTopLeagues(endpoint, targetDate)
        } else {
            const formatDate = targetDate.format('YYYY-MM-DD')
            fetchTopLeagues(endpoint, formatDate)
        }
    }

    const onChangeCalendar = (date) => {
        if (SPORT_NAME === SPORT_MOTORSPORT) {
            fetchMatches(date)
        } else {
            fetchMatches(date)
            setDate(date)
        }
    }
    const onChangeWeek = (item) => {
        const roundId = item.target.value;
        fetchTopLeaguesByWeek(roundId)
    }

    useEffect(() => {
        setLoading(false)
        setFilteredMatches(matches)
    }, [matches])

    const onSearch = (e) => {
        const keyword = (e.target.value).toLowerCase().trim()
        if (!keyword) {
            setFilteredMatches(matches)
            return
        }
        const filtered = matches.filter(item => {
            return modifyPhraseForSearch(item.name).includes(keyword) || item.events.find(eventItem => {
                return modifyPhraseForSearch(eventItem.name).includes(keyword)
            })
        })
        setFilteredMatches(filtered)
    }

    return <>
        <div className="row my-1">
            <div className="col-md-8">
                {SPORT_NAME === SPORT_MOTORSPORT ?
                    <RacesCalendar onChange={onChangeCalendar}/> : process.env.NEXT_PUBLIC_LOAD_WEEKS_SLUG ?
                        <WeekSelector onChange={onChangeWeek} weeks={weeks} selectedWeek={selectedWeek}/> : <Calendar onChange={onChangeCalendar} date={date}/>}
            </div>

            <div className="col-md-4"/>
        </div>

        <div className="row">
            <div className="col-md-8">
              <SportsIcons />
                <Card className="responsiveBodyPadding mb-3">
                    <Loading loading={loading}/>
                    {
                        !loading && filteredMatches.map(league => {
                            return <Matches key={league.id} league={league}/>
                        })
                    }
                </Card>
                <Card id={"dynamic-content"} className="mb-3" style={{marginTop: '8px'}} dangerouslySetInnerHTML={{__html: content.content}}/>
                <div className='mb-2 px-1'>
                    <a className="current-color pe-3" href={`/${process.env.NEXT_PUBLIC_NEWS_BASE_ROUTE}`}>
                        <strong>News</strong>
                    </a>
                </div>

                <div className="row">

                    {
                        news?.map(item => {
                            return <div key={item.id} className="col-md-6">
                                <PostItem key={item.id} post={item}/>
                            </div>
                        })
                    }
                </div>

            </div>
            <div className="col-md-4">
                <Blogs blogs={blogs}/>
                <DriversStanding driversStandings={driversStandings} teamsStandings={teamsStandings}/>
                {SPORT_NAME === SPORT_SOCCER && <Standings standings={standings}/>}
                {[SPORT_BASKETBALL, SPORT_BASEBALL, SPORT_AMERICAN_FOOTBALL, SPORT_ICE_HOCKEY].includes(SPORT_NAME) &&
                <StandingsTypeTwo standings={standings}/>}
                {SPORT_NAME === SPORT_BASKETBALL && <TopPlayers/>}
                <Tweets tweets={tweets}/>
            </div>

        </div>

    </>
}


const mapStateToProps = state => ({
    matches: state.league.leagues,
    weeks: state.home.weeks,
    selectedWeek: state.home.selectedWeek,
    endpoint: state.sport.endpoint,
    content: state.home.content,
    blogs: state.home.blogs.slice(0, 3),
    news: state.home.news?.data.slice(0, 2),
    tweets: state.home.tweets,
    standings: state.home.standings,
    driversStandings: state.home.driverStanding,
    teamsStandings: state.home.titleEventTeamsStanding
})

export default connect(mapStateToProps, {fetchTopLeagues,fetchTopLeaguesByWeek})(memo(Home))
