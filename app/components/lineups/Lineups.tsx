import {Col, Row} from 'react-bootstrap'
import Lineup from './Lineup'
import {CALLED_EVENT, HAVE_LINEUP_SPORTS, SPORT_NAME, SPORT_SOCCER} from '../../constants'
import LineupsTypeTwo from '../match/lineups/LineupsTypeTwo'

const Lineups = ({lineups, event, loading}) => {
    if (loading || !lineups) return null
    if (Array.isArray(lineups) && lineups.length === 0) {
        return <p className='text-muted'>the {CALLED_EVENT[0]} has not lineups</p>
    }
    if (!HAVE_LINEUP_SPORTS.includes(SPORT_NAME)) return null
    if (SPORT_NAME !== SPORT_SOCCER) return <LineupsTypeTwo lineups={lineups}
                                                            homeTeam={event.homeTeam}
                                                            awayTeam={event.awayTeam}/>

    const homeTeamLineup = lineups?.[Object.keys(lineups)[0]]
    const awayTeamLineup = lineups?.[Object.keys(lineups)[1]]
    return <Row>
        <Col md={6}>
            <Lineup lineup={homeTeamLineup}/>
        </Col>
        <Col md={6}>
            <Lineup lineup={awayTeamLineup}/>
        </Col>
    </Row>
}

export default Lineups