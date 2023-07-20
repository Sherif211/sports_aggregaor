import {generateEventHref} from '../../helpers/utilities'
import {CANCELED_EVENT_STATUS, NOT_STARTED_EVENT_STATUS} from '../../constants'
import CustomNextImage from '../image/CustomNextImage'
import StatusDescription from './detail/StatusDescription'

const H2HRow = ({item}) => {
    const {
        id,
        title,
        formattedStartDate,
        startDate,
        slug,
        homeTeam,
        awayTeam,
        status,
        homeScore,
        awayScore
    } = item

    const score = () => {
        if (status.type !== 'finished') return 'VS'
        if (!homeScore) return ''
        return homeScore?.current + ' - ' + awayScore?.current
    }
    return <tr>
        <td>
            <div className="d-flex align-items-center justify-content-between">
                <span style={{minWidth: '100px'}}>{formattedStartDate ?? startDate}</span>
                <a href={generateEventHref(!!title, slug, id)} className="w-100">
                    <div className="matchItem">
                        {title && <span className="name"> {title} </span>}
                        {
                            awayTeam && <>
                                <div className="mathItem--team matchItem--home">
                                    <span className="name"> {homeTeam.name} </span>
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
                                    />
                                    <span className="name"> {awayTeam.name}</span>
                                </div>
                            </>
                        }
                    </div>
                </a>
            </div>
        </td>
    </tr>

}

export default H2HRow