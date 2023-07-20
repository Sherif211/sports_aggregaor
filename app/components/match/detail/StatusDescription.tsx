import {
    CANCELED_EVENT_STATUS,
    FINISHED_EVENT_STATUS,
    IN_PROGRESS_EVENT_STATUS,
    NOT_STARTED_EVENT_STATUS,
    WILL_CONTINUE_EVENT_STATUS
} from '../../../constants'
import {timestampToTime} from '../../../helpers/utilities'
import statusDescription from '../../../utilites/statusDescription'
import {memo} from 'react'


const StatusDescription = ({type, startTimestamp = null, description = ''}) => {
    return <span
        className={`competition-cell-status ${(type === IN_PROGRESS_EVENT_STATUS || type === WILL_CONTINUE_EVENT_STATUS) ? 'competition-cell-time' : ''}`}>
        {(type === NOT_STARTED_EVENT_STATUS && !startTimestamp) && 'vs'}
        {type === IN_PROGRESS_EVENT_STATUS || type === WILL_CONTINUE_EVENT_STATUS ? (statusDescription(description)) : ''}
        {type === FINISHED_EVENT_STATUS ? 'FT ' : ''}
        {type === CANCELED_EVENT_STATUS ? ' canceled ' : ''}
        {(startTimestamp && type === NOT_STARTED_EVENT_STATUS) ? <span className="startTime">
                  <i className="fas fa-clock"/>
         <span>{timestampToTime(startTimestamp)}</span>
      </span> : null}

    </span>
}

export default memo(StatusDescription)