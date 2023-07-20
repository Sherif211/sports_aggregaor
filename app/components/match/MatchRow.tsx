import {connect} from 'react-redux'
import {memo} from 'react'
import {
    CANCELED_EVENT_STATUS,
    FINISHED_EVENT_STATUS,
    IN_PROGRESS_EVENT_STATUS,
    NOT_STARTED_EVENT_STATUS,
    SPORT_NAME,
    SPORT_SOCCER
} from '../../constants'
import {generateEventHref, generateGeneralEventHref, timestampTo24FormatTime} from '../../helpers/utilities'
import CustomNextImage from '../image/CustomNextImage'
import StatusDescription from './detail/StatusDescription'


const MatchRow = ({item}) => {
    const {id, title, name, slug, startTimestamp, homeTeam, awayTeam, status, type, homeScore, awayScore, venue,generalTeamsSlug} = item

    const getTimeColumn = (statusType = status?.type ?? type) => {
        if (statusType === NOT_STARTED_EVENT_STATUS) {
            return <time>{timestampTo24FormatTime(startTimestamp)}</time>
        } else if (statusType === IN_PROGRESS_EVENT_STATUS) {
            return <strong className="text-danger">• LIVE</strong>
        } else if (statusType === CANCELED_EVENT_STATUS) {
            return 'Canceled'
        }
        return startTimestamp ? timestampTo24FormatTime(startTimestamp) : ''
    }


    const score = () => {
        if (status?.type !== FINISHED_EVENT_STATUS && status?.type !== IN_PROGRESS_EVENT_STATUS) return 'VS'
        if (!homeScore) return ''
        return homeScore?.current + ' - ' + awayScore?.current
    }

    return <tr>
        <td>
            <a title={`${name} Live Streams`} href={generalTeamsSlug ? generateGeneralEventHref(title,generalTeamsSlug) :   generateEventHref(title, slug, id)}>
                <div className="matchItem">
                    {title && <span className="name"> {title} </span>}
                    {
                        awayTeam && <>
                            <div className="mathItem--team matchItem--home">
                                <span className="name">{homeTeam.name} </span>
                                <CustomNextImage
                                    src={homeTeam.logo}
                                    alt={homeTeam.name}
                                    width={30}
                                    height={30}
                                />
                            </div>
                            <div className="matchItem--info">
                                {(status.type !== NOT_STARTED_EVENT_STATUS && status.type !== CANCELED_EVENT_STATUS) ? (score()) : null}
                                <StatusDescription type={status.type}/>
                            </div>
                            <div className="mathItem--team matchItem--away">
                                <CustomNextImage
                                    src={awayTeam.logo}
                                    alt={awayTeam.name}
                                    width={30}
                                    height={30}
                                    quality={75}
                                />
                                <span className="name"> {awayTeam.name}</span>
                            </div>
                        </>
                    }
                </div>
            </a>
        </td>
        <td className="text-center">
            {getTimeColumn()}
        </td>
        <td className="hideOnMobile text-center">{venue ? venue?.name : ''}</td>
    </tr>
}

const mapStateToProps = state => ({
    sportSlug: state.sport.slug
})

export default connect(mapStateToProps, {})(memo(MatchRow))