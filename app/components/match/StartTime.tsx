import {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {calculateTimeLeft, timestampTo24FormatTime, twoDigitNumber} from '../../helpers/utilities'

const StartTime = ({timestamp}) => {

   const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(timestamp))

   useEffect(() => {
      setTimeout(() => {
         setTimeLeft(calculateTimeLeft(timestamp))
      }, 1000)
   })
   
   return timeLeft['days'] > 0 ? <div>
         <div className='days-left'>IN {timeLeft['days']} DAYS</div>
         <div className='start-time'>{timestampTo24FormatTime(timestamp)}</div>
      </div>
      : <div
         className='start-time timer'>{twoDigitNumber(timeLeft['hours']) + ':' + twoDigitNumber(timeLeft['minutes']) + ':' + twoDigitNumber(timeLeft['seconds'])}</div>
}

StartTime.propTypes = {
   timestamp: PropTypes.number.isRequired
}
export default StartTime
