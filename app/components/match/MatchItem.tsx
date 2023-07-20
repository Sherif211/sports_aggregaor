import {CANCELED_EVENT_STATUS, NOT_STARTED_EVENT_STATUS} from '../../constants'
import StatusDescription from './detail/StatusDescription'
import CustomNextImage from '../image/CustomNextImage'
import {memo} from 'react'

const MatchItem = ({item}) => {

    const {startTimestamp, homeTeam, awayTeam, status, homeScore, awayScore} = item

    const getTeamName = (name) => {
        if (typeof window == 'undefined') return name
        const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
        if (width <= 768) {
            name = name.split(' ')
            return name[name.length - 1]
        }
        return name
    }

    const score = () => {
        if (status.type !== 'finished') return 'VS'
        if (!homeScore) return ''
        return homeScore?.current + ' - ' + awayScore?.current
    }

    return <>
        <div className="matchItem">
            <div className="matchItem--home">
                <span className="name"> {getTeamName(homeTeam.name)} </span>
                <CustomNextImage
                    src={homeTeam.logo}
                    alt={homeTeam.name}
                    width={30}
                    height={30}
                />
            </div>
            <div className="matchItem--info">
                {(status.type !== NOT_STARTED_EVENT_STATUS && status.type !== CANCELED_EVENT_STATUS) ? (score()) : null}
                <StatusDescription startTimestamp={startTimestamp} type={status.type}/>
            </div>
            <div className="matchItem--away">
                <CustomNextImage
                    src={awayTeam.logo}
                    alt={awayTeam.name}
                    width={30}
                    height={30}
                />
                <span className="name"> {getTeamName(awayTeam.name)}</span>
            </div>
        </div>
    </>
}

export default memo(MatchItem)