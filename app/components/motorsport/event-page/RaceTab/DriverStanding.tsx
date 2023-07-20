import CardTable from '../../../table/CardTable'
import {memo} from 'react'
import {SPORT_MOTORSPORT, SPORT_NAME} from '../../../../constants'
import {connect} from 'react-redux'
import EventDriverRowComponent from './DriverRow'
import DriverHead from './DriverHead'

const DriverStanding = ({raceStanding, race}) => {

    if (SPORT_NAME !== SPORT_MOTORSPORT) return null

    return <CardTable
        additionalData={{race: race}}
        head={<DriverHead race={race}/>}
        RowComponent={EventDriverRowComponent}
        bodyData={raceStanding}/>

}

const mapStateToProps = state => ({
    raceStanding: state.event.raceStanding
})

export default connect(mapStateToProps, null)(memo(DriverStanding))
