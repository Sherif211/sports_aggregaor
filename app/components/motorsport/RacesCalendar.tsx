import {useState} from 'react'
import {CALLED_EVENT} from "../../constants"

const RacesCalendar = ({onChange}) => {
    const [selected, setSelected] = useState('live')
    const onClickHandler = (type) => {
        setSelected(type)
        onChange(type)
    }
    return <>
        <ul id='mini-calendar' className='calendarMatches'>
            <li onClick={() => onClickHandler('finished')} className={`race ${selected === 'finished' ? 'selected' : ''}`}>
                Finished {CALLED_EVENT[1] ?? 'matches'}
            </li>
            <li onClick={() => onClickHandler('live')} className={`race ${selected === 'live' ? 'selected' : ''}`}>
                Live & Upcoming {CALLED_EVENT[1] ?? 'matches'}
            </li>
        </ul>
    </>
}

export default RacesCalendar