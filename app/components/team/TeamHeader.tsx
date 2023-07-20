import Card from '../card/Card'
import CustomNextImage from '../image/CustomNextImage'
import {CALLED_EVENT} from '../../constants'

const TeamHeader = ({team, heading = ''}) => {
    return <Card className="mb-3">
        <div className="team--header">
            {
                team?.logo ? <CustomNextImage src={team.logo} width={85} height={85} alt="name"/> : null
            }
            <div className="info">
                <h1>
                    <strong>{heading ?? team?.name}</strong>
                </h1>
                <p>Watch every single {team?.name} {CALLED_EVENT[1] ?? 'matches'} live streaming online for free</p>
            </div>
        </div>
    </Card>
}

export default TeamHeader