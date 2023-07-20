import {Component, memo} from 'react'
import classnames from 'classnames'
import {getNextDayDate, getPreDayDate, getTimezone} from '../../helpers/utilities'
import Day from './Day'

class Calendar extends Component {
   constructor(props) {
      super(props)
      this.state = {
         showCalendar: false,
         subDays: 0,
         addDays: 0,
         dates: []
      }
      this.toggleShowCalendar = this.toggleShowCalendar.bind(this)
   }

   static addDay(date, days) {
      return getNextDayDate(date, days)
   }

   static subDay(date, days) {
      return getPreDayDate(date, days)
   }

   getDates() {
      const date = getTimezone()
      let dates = []
      dates.push(Calendar.subDay(date, 1))
      dates.push(date)
      dates.push(Calendar.addDay(date, 1))
      return dates
   }


   toggleShowCalendar() {
      this.setState({
         showCalendar: !this.state.showCalendar
      })
   }

   componentDidMount() {
      this.setState({
         dates: this.getDates()
      })
   }

   render() {
      const currentDate = this.props.date
      const today = getTimezone()
      const props = this.props

      return <>
         <ul id='mini-calendar' className={classnames('calendarMatches', {
            'hide': this.state.showCalendar
         })}>
            {this.state.dates.length > 0 &&
            <>
               <Day showMonth={false} onChange={props.onChange} currentDate={currentDate}
                    date={this.state.dates[0]}
                    name={'Yesterday'}
                    today={today}/>
               <Day showMonth={false} onChange={props.onChange} currentDate={currentDate}
                    date={this.state.dates[1]}
                    name={'Today'}
                    today={today}/>
               <Day showMonth={false} onChange={props.onChange} currentDate={currentDate}
                    date={this.state.dates[2]}
                    name={'Tomorrow'}
                    today={today}/>
            </>}
         </ul>
      </>
   }
}

export default memo(Calendar)
