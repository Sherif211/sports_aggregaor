import CustomNextImage from '../../image/CustomNextImage'

const TeamsStandingRow = ({item}) => {
    const {team} = item
    return <tr>
        <td>
            <div className="d-flex align-items-center">
                <div className="teamColor me-1" style={{borderTopColor: team.teamColors.primary}}/>
                <div
                    className={`position-container flex flex-column 
                    ${(item.position - item.previousPosition < 0 && item.position - item.previousPosition !== 0) ? 'after' : item.position - item.previousPosition > 0 ? 'before' : ''} `}>
                    {item.position}
                </div>
            </div>
        </td>
        <td>
            <div className="d-flex align-items-center py-1">
                <CustomNextImage alt={team.name} width={40} height={40}
                                 src={`https://scdn.dev/api/formula-1/${team.id}/team-image`}/>
                <span className="ms-2">{team.name}</span>
            </div>
        </td>
        <td>{item.points}</td>
    </tr>

}

export default TeamsStandingRow