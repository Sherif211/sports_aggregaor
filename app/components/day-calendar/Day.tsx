import PropTypes from 'prop-types'
import classnames from 'classnames'
import DayInfo from './DayInfo'

const Day = (props) => {
   const currentDate = props.currentDate.format('YYYY-MM-DD')
   const date = props.date.format('YYYY-MM-DD')
   const today = props.today.format('YYYY-MM-DD')
   const name = props.name
   return (
      <li onClick={() => date !== currentDate ? props.onChange(props.date) : ''} className={classnames({
         'selected': date === currentDate,
         'today': date === today
      })}>
         <DayInfo name={name}/>
      </li>
   )
}

Day.propTypes = {
   currentDate: PropTypes.any.isRequired,
   date: PropTypes.any.isRequired,
   today: PropTypes.any.isRequired,
   onChange: PropTypes.func.isRequired,
   showMonth: PropTypes.bool.isRequired
}

export default Day