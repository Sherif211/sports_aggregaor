import CustomNextImage from '../../../image/CustomNextImage'
import {connect} from 'react-redux'
import {memo} from 'react'
import {getTitleEventInfoImageEndpoint} from '../../../../helpers/endpoints'
import {getDate} from '../../../../helpers/utilities'

const InfoTabContent = ({titleEventInfo, event, stages}) => {
    return <div className="font-size-small">
        <div className="bg-secondary bg-opacity-75 p-2 text-white">
            <strong>SCHEDULE</strong>
        </div>
        {
            stages.map(item => {
                return <div key={item.id} className="d-flex justify-content-between px-2 py-1">
                    <span>{item.description}</span>
                    <time>{getDate(item.startDateTimestamp * 1000, 'D MMM hh:mm A')}</time>
                </div>
            })
        }


        <div className="my-2">
            {event?.tournament.id === 3670 && <CustomNextImage alt={`${event.title ?? event.name} map`} quality={100}
                                                               src={getTitleEventInfoImageEndpoint(event.id)}
                                                               width="100%"
                                                               height="100%"/>}
        </div>

        <div className="bg-secondary bg-opacity-75 p-2 text-white">
            <strong>INFO</strong>
        </div>
        <div className="d-flex justify-content-between px-2 py-1">
            <span>City</span>
            <span>{titleEventInfo.info?.circuitCity}</span>
        </div>
        <div className="d-flex justify-content-between px-2 py-1">
            <span>Laps</span>
            <span>{titleEventInfo.info?.laps}</span>
        </div>
        <div className="d-flex justify-content-between px-2 py-1">
            <span>Circuit length</span>
            <span>{titleEventInfo.info?.circuitLength}</span>
        </div>
        <div className="d-flex justify-content-between px-2 py-1">
            <span>Race distance</span>
            <span>{titleEventInfo.info?.raceDistance}</span>
        </div>
        <div className="d-flex justify-content-between px-2 py-1">
            <span>Lap record</span>
            <span>{titleEventInfo.info?.lapRecord}</span>
        </div>
    </div>

}

const mapStateToProps = state => ({
    event: state.event.event,
    stages: state.event.raceStages,
    titleEventInfo: state.event.titleEventInfo
})
export default connect(mapStateToProps, null)(memo(InfoTabContent))