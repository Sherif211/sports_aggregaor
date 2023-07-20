import {generateTeamHref} from '../../../helpers/utilities'
import StartTime from '../StartTime'
import {
    FINISHED_EVENT_STATUS,
    IN_PROGRESS_EVENT_STATUS,
    NOT_STARTED_EVENT_STATUS,
    SPORT_NAME,
    SPORT_SOCCER
} from '../../../constants'
import CustomNextImage from '../../image/CustomNextImage'

const ResultSection = ({event}) => {

    const getScore = (status, currentScore) => {
        if (status === FINISHED_EVENT_STATUS) {
            return currentScore
        } else if (status === NOT_STARTED_EVENT_STATUS) {
            return ''
        }
        return currentScore
    }

    const getStatus = (status, description = null) => {
        if (status === FINISHED_EVENT_STATUS) {
            return description ?? 'FULL TIME'
        } else if (status === IN_PROGRESS_EVENT_STATUS) {
            return `${description}${(SPORT_NAME === SPORT_SOCCER && !isNaN(description)) ? `'` : ''}`
        } else if (status === NOT_STARTED_EVENT_STATUS) {
            return <StartTime timestamp={event.startTimestamp}/>
        }
        return 'vs'
    }

    return <div className="matchDetail--result">
        {
            event.homeTeam && <>
                <div className="team home-team">

                    <div className="nameLogoScore">
                        <a href={generateTeamHref(event.homeTeam.slug, event.homeTeam.id)}>
                            <div className="nameLogo">
                                <h5 className="text-black">{event.homeTeam.name}</h5>
                                <CustomNextImage alt={event.homeTeam.name} src={event.homeTeam.logo}
                                                 width={42} height={42}/>
                                <strong
                                    className="nameInMobile text-black">{event.homeTeam.name}</strong>
                            </div>
                        </a>
                        <strong className="score">{getScore(event?.status.type, event?.homeScore?.current)}</strong>
                    </div>
                </div>

                <span className="status">
               {
                   getStatus(event.status.type, event.statusDescription)
               }
            </span>

                <div className="team away-team">
                    <div className="nameLogoScore">
                        <strong className="score">{getScore(event?.status.type, event?.awayScore?.current)}</strong>
                        <a href={generateTeamHref(event.awayTeam.slug, event.awayTeam.id)}>
                            <div className="nameLogo">
                                <CustomNextImage alt={event.awayTeam.name} src={event.awayTeam.logo} width={42}
                                                 height={42}/>
                                <strong
                                    className="nameInMobile text-black">{event.awayTeam.name}</strong>
                                <h5 className="text-black">{event.awayTeam.name}</h5>
                            </div>
                        </a>
                    </div>


                </div>
            </>
        }

        {
            event.title && <p className="text-center">
                {event.title}
            </p>
        }

    </div>
}

export default ResultSection