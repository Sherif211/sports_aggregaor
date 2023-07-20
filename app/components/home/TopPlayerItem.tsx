import CustomNextImage from '../image/CustomNextImage'

const TopPlayerItem = ({item, index}) => {
    const {event, team, player} = item
    return <div className="d-flex justify-content-between align-items-center font-size-small mb-2">
        <div className="d-flex align-items-center">
            <span className="me-1 w-20px">{index + 1}</span>
            <CustomNextImage className="rounded-circle border" width={44} height={44} alt={player.name}
                             src={`https://api.sofascore.app/api/v1/player/${player.id}/image`}/>
            <CustomNextImage className="rounded-circle position-relative topPlayerTeamImage" width={20} height={20}
                             alt={team.name}
                             src={`https://api.sofascore.app/api/v1/team/${team.id}/image`}/>
            <div className="d-flex flex-column">
                <strong>{player.name}</strong>
                <span className="text-secondary font-size-xsmall">
                    {`${event?.homeTeam?.shortName} vs. ${event?.awayTeam?.shortName}`}
                </span>
            </div>
        </div>
        <span className="text-secondary">{item.points}</span>
    </div>

}

export default TopPlayerItem