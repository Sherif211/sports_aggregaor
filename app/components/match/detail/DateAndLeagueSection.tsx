import {generateLeagueHref} from '../../../helpers/utilities'

const DateAndLeagueSection = ({event}) => {
    return <>
        <div className="matchDetail--date">
            <div className="matchDetail--container">
            <span>
               {event.formatedStartDate ?? event.startDate} - <a
                href={generateLeagueHref(event.tournament.slug, event.tournament.id)}><span
                className="pointer text-black">{event.tournament.name}</span></a>
            </span>
            </div>
        </div>
    </>
}

export default DateAndLeagueSection