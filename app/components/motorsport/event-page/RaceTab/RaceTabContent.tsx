import {Form} from 'react-bootstrap'
import {getDate} from '../../../../helpers/utilities'
import {connect} from 'react-redux'
import {memo, useState} from 'react'
import {fetchStandingOfStage} from '../../../../../redux/actions/eventActions'
import EventDriverStanding from './DriverStanding'

const RaceTabContent = ({event, fetchStandingOfStage, stages}) => {
    const [isRace, setIsRace] = useState(false)
    const indexOfNotStarted = stages.findIndex(item => item.status.type === 'notstarted')
    let selectedIndex = 0
    if (indexOfNotStarted !== -1 && indexOfNotStarted > 1) {
        selectedIndex = indexOfNotStarted - 1
    }
    const [selectedStage, setSelectedStage] = useState(stages?.[selectedIndex]?.id ?? stages?.[0].id)
    const onChangeStage = (e) => {
        if (e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text.includes('RaceTabContent')) {
            setIsRace(true)
        } else {
            setIsRace(false)
        }
        fetchStandingOfStage(e.target.value)
        setSelectedStage(e.target.value)
    }
    return <div>
        <Form.Select value={selectedStage} className="mb-1" size="sm" aria-label="select" onChange={onChangeStage}>
            {
                stages.map(item => {
                    return <option key={item.id}
                                   value={item.id}>{`${item.description}, ${getDate(item.startDateTimestamp * 1000, 'D MMM, hh:mm A')}`}</option>
                })
            }

        </Form.Select>
        <EventDriverStanding race={isRace}/>
    </div>

}

const mapStateToProps = state => ({
    event: state.event.event,
    stages: state.event.raceStages
})
export default connect(mapStateToProps, {fetchStandingOfStage})(memo(RaceTabContent))