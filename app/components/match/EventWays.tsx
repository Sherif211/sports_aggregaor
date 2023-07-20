import {connect} from 'react-redux'
import {memo} from 'react'
import {LEAGUE_BASE_ROUTE, TEAM_BASE_ROUTE} from '../../constants'


const EventWays = (props) => {
    function getHomeTeam() {
        if (!props.event.homeTeam) return props.event.title
        const team = props.event.homeTeam
        const HomeTeamLink = <a
            href={`/${TEAM_BASE_ROUTE}/` + team.slug + '-live-stream/' + team.id}>{team.name}</a>
        return HomeTeamLink
    }

    function getAwayTeam() {
        if (!props.event.homeTeam) return props.event.title
        const team = props.event.awayTeam
        const AwayTeamLink = <a
            href={`/${TEAM_BASE_ROUTE}/` + team.slug + '-live-stream/' + team.id}>{team.name}</a>
        return AwayTeamLink
    }

    function getYearFromTimestamp() {
        const d = new Date(props.event.startTimestamp * 1000)
        return d.getFullYear()
    }

    return <div>
        <p id="event-tags">
            {getHomeTeam()} vs {getAwayTeam()} live stream,&nbsp;
            {getAwayTeam()} vs {getHomeTeam()} live stream,&nbsp;
            {getHomeTeam()} vs {getAwayTeam()} online free,&nbsp;
            {getHomeTeam()} vs {getAwayTeam()} free stream,&nbsp;
            {getHomeTeam()} vs {getAwayTeam()} online,&nbsp;
            {getHomeTeam()} vs {getAwayTeam()} <a
            href={`/${LEAGUE_BASE_ROUTE}/` + props.event.tournament.slug + '-live-stream/' + props.event.tournament.id}>{props.event.tournament.uniqueName}</a> live {getYearFromTimestamp()}
        </p>
    </div>
}

const mapStateToProps = state => ({
    event: state.event.event
})
export default connect(mapStateToProps, {})(memo(EventWays))