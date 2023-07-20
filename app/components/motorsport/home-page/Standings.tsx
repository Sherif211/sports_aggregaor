import {Nav} from 'react-bootstrap'
import CardTable from '../../table/CardTable'
import DriverStandingRow from './DriverStandingRow'
import {memo, useState} from 'react'
import {SPORT_MOTORSPORT, SPORT_NAME} from '../../../constants'
import TeamsStandingRow from './TeamsStandingRow'
import DriverStandingHead from './DriverStandingHead'
import TeamStandingHead from './TeamStandingHead'

const Standings = ({driversStandings, teamsStandings}) => {
    const [selectedStanding, setSelectedStanding] = useState('#DRIVERS')
    if (SPORT_NAME !== SPORT_MOTORSPORT) return null

    const onNavClickHandler = (selectedTab) => {
        setSelectedStanding(selectedTab)
    }

    const topRender = <Nav onSelect={onNavClickHandler} className="matchDetailNav me-auto" activeKey={selectedStanding}
                           defaultActiveKey="#DRIVERS">
        <div className="matchDetail--container">
            <Nav.Link href="#DRIVERS">DRIVERS</Nav.Link>
            <Nav.Link href="#TEAMS">TEAMS</Nav.Link>
        </div>
    </Nav>

    return <CardTable
        className="mb-3"
        head={selectedStanding === '#DRIVERS' ? <DriverStandingHead/> : <TeamStandingHead/>}
        topRender={topRender}
        RowComponent={selectedStanding === '#DRIVERS' ? DriverStandingRow : TeamsStandingRow}
        bodyData={selectedStanding === '#DRIVERS' ? driversStandings : teamsStandings}
    />
}


export default memo(Standings)
