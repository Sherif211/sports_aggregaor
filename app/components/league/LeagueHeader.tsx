import Card from '../card/Card'
import CustomNextImage from '../image/CustomNextImage'
import {CALLED_EVENT} from '../../constants'

const LeagueHeader = ({league, heading = ''}) => {
    return <Card className="mb-1">
        <div className="leaguePage__header">
            {
                league?.logo ?
                    <CustomNextImage quality={75} src={league.logo} width={85} height={85} alt={league.name}/> : null
            }
            <div className="info">
                <h1>
                    <strong>{heading ?? league?.name}</strong>
                </h1>
                <p>Watch every single {league?.name} {CALLED_EVENT[1] ?? 'matches'} live streaming online for free</p>
            </div>
        </div>
    </Card>
}

export default LeagueHeader