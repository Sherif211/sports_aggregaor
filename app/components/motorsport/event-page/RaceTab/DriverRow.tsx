import CustomNextImage from '../../../image/CustomNextImage'

const RowComponent = ({item, additionalData}) => {
    const {team, parentTeam} = item
    return <tr>
        <td>
            <div className="d-flex align-items-center">
                {parentTeam?.teamColors?.primary && <div className="teamColor me-1"
                                                         style={{borderTopColor: parentTeam?.teamColors?.primary}}/>}
                <div
                    className={`position-container flex flex-column 
                    ${(item.position - item.previousPosition < 0 && item.position - item.previousPosition !== 0) ? 'after' : item.position - item.previousPosition > 0 ? 'before' : ''} `}>
                    {item.position}
                </div>
            </div>
        </td>
        <td>
            <div className="d-flex align-items-center py-1">
                <div className="d-flex flex-column">
                    <div className="font-size-small cutterText mb-1">
                        <CustomNextImage alt={team.country.name ?? team.country.alpha2} width={16} height={16}
                                         src={`https://www.sofascore.com/static/images/flags/${team.country.alpha2.toLowerCase()}.png`}/> {team.name}
                    </div>

                    <span className="text-secondary font-size-xsmall">{team?.parentTeam?.name ?? ''}</span>
                </div>
            </div>
        </td>
        {additionalData.race && <td>{item.gridPosition}</td>}
        {additionalData.race && <td>{item.pitStops}</td>}
        <td>{item.laps}</td>
        {additionalData.race && <td>{item.points}</td>}
        <td>{item.gap}</td>
        {!additionalData.race && <td>{item.totalTime}</td>}
    </tr>

}

export default RowComponent