import CustomNextImage from '../../image/CustomNextImage'

const DriverStandingRow = ({item}) => {
    if (!item) return null
    const {team} = item
    return <tr>
        <td>
            <div className="d-flex align-items-center">
                <div className={item?.parentTeam?.teamColors?.primary ? 'teamColor me-1' : ''}
                     style={{borderTopColor: item?.parentTeam?.teamColors?.primary ?? 'transparent'}}/>
                <div
                    className={`position-container flex flex-column 
                    ${(item?.position - item?.previousPosition < 0 && item.position - item?.previousPosition !== 0) ? 'before' : item.position - item.previousPosition > 0 ? 'after' : ''} `}>
                    {item?.position}
                </div>
            </div>
        </td>
        <td>
            <div className="d-flex align-items-center py-1">
                <CustomNextImage alt={team?.name} width={40} height={40}
                                 src={`https://api.sofascore.app/api/v1/team/${team?.id}/image`}/>
                <div className="d-flex flex-column ps-3">
                    <div className="font-size-small cutterText">
                        <CustomNextImage alt={team?.country?.name ?? team?.country.alpha2} width={16} height={16}
                                         src={`https://www.sofascore.com/static/images/flags/${(team?.country?.alpha2)?.toLowerCase()}.png`}/> {team?.name}
                    </div>

                    <span className="text-secondary font-size-xsmall">{team?.parentTeam?.name}</span>
                </div>
            </div>
        </td>
        <td>{item?.victories}</td>
        <td>{item?.polePositions}</td>
        <td>{item?.podiums}</td>
        <td>{item?.points}</td>
    </tr>

}

export default DriverStandingRow