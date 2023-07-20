import PropTypes from 'prop-types'

const DayInfo = (props) => {
   return <div>
      <span className='day'>{props.name}</span>
   </div>
}

DayInfo.propTypes = {
   name: PropTypes.string.isRequired
}
export default DayInfo