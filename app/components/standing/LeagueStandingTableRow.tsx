import {generateHref} from '../../helpers/utilities'
import CustomNextImage from '../image/CustomNextImage'

const StandingTableRow = ({item}) => {
    const {team, totalFields} = item
    return <tr>
        <td>
         <span>
            {item.position}
         </span>
        </td>
        <td>
            <a href={generateHref('team', team?.slug, team?.id)}>
                <div className="y-center pointer">
                    <CustomNextImage src={team?.logo} width={25} height={25} alt={team?.name}/>
                    <span className="px-1 teamName text-black">{team?.name}</span>
                </div>
            </a>

        </td>
        <td title={`${totalFields.pointsTotal ?? item.points} total points`}>{team.points ?? item.points}</td>
        <td title={`${totalFields.winTotal ?? item.wins} games Won`}>{totalFields.winTotal ?? item.wins}</td>
        <td title={`${totalFields.lossTotal ?? item.losses} games lost`}>{totalFields.lossTotal ?? item.losses}</td>
        {process.env.NEXT_PUBLIC_SPORT !== 'soccer' &&
        <td title={`${item.gamesBehind} games behind`}>{item.gamesBehind}</td>}
        <td title={`${totalFields.drawTotal ?? item.streak} games drawn`}>{totalFields.drawTotal ?? item.streak}</td>
        <td
            title={process.env.NEXT_PUBLIC_SPORT === 'soccer' ? 'Goals scored : Goals against' : 'percentage'}>{totalFields.goalsTotal ?? item.percentage}</td>
        {/*{process.env.NEXT_PUBLIC_SPORT === 'soccer' && <td>{item.points}</td>}*/}
    </tr>
}
export default StandingTableRow