import {Nav} from 'react-bootstrap'
import {HAVE_LINEUP_SPORTS, HAVE_STANDING_SPORTS, SPORT_NAME, SPORT_SOCCER} from '../../constants'
import {memo} from 'react'
import CustomNextImage from '../image/CustomNextImage'

const MatchNav = ({onNavClickHandler, selectedTab, tabs}) => {
    const hasStanding = HAVE_STANDING_SPORTS.includes(SPORT_NAME) && tabs['Standing']
    const hasLineups = HAVE_LINEUP_SPORTS.includes(SPORT_NAME) && tabs['Line Ups']
    const hasH2H = SPORT_NAME === SPORT_SOCCER && tabs['H2H']
    const hasStats = SPORT_NAME === SPORT_SOCCER && tabs['Stats']
    const hasIncidents = SPORT_NAME === SPORT_SOCCER && tabs['Incidents']
    const hasAboutMatch = false
    return <>
        <Nav onSelect={onNavClickHandler}
             className="matchDetailNav me-auto" activeKey={selectedTab} defaultActiveKey="#livestream">
            <div className="matchDetail--container">
                <Nav.Link href="#livestream">Live stream</Nav.Link>
                {hasStanding && <Nav.Link href="#standing">Standings</Nav.Link>}
                {hasLineups && <Nav.Link href="#lineups">Line Ups</Nav.Link>}
                {hasH2H && <Nav.Link href="#h2h">H2H</Nav.Link>}
                {hasStats && <Nav.Link href="#stats">Stats</Nav.Link>}
                {hasIncidents && <Nav.Link href="#incidents">Incidents</Nav.Link>}
                {hasAboutMatch && <Nav.Link href="#aboutmatch">About Match</Nav.Link>}

            </div>
        </Nav>
    </>
}

export default memo(MatchNav)