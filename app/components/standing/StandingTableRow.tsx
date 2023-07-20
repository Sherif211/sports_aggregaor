import {generateHref} from '../../helpers/utilities'
import CustomNextImage from '../image/CustomNextImage'
import {TEAM_BASE_ROUTE} from '../../constants'


const StandingTableRow = ({item, additionalData}) => {
    const {team, totalFields} = item
    return <tr
        className={additionalData?.homeTeamId === team.id ? 'highlightHome' : (additionalData?.awayTeamId === team.id ? 'highlightAway' : '')}>
        <td>
         <span className={item.position <= 6 ? 'highlight-no badge badge-info' : ''}>
            {item.position}
         </span>
        </td>
        <td>
            <a href={generateHref(TEAM_BASE_ROUTE, team.slug, team.id)}>
                <div className="y-center pointer">
                    <CustomNextImage src={team.logo} width={25} height={25} alt={team.name}/>
                    <span className="px-1 teamName text-black">{team.name}</span>
                </div>
            </a>

        </td>
        <td>{totalFields.winTotal}</td>
        <td>{totalFields.lossTotal}</td>
        <td>{totalFields.drawTotal}</td>
        <td>{item.points}</td>
    </tr>
}

export default StandingTableRow