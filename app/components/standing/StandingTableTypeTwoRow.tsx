const StandingTableRow = ({item, additionalData}) => {
    const {team} = item
    return <tr
        className={additionalData?.homeTeamId === team.id ? 'highlightHome' : (additionalData?.awayTeamId === team.id ? 'highlightAway' : '')}>
        <td>
         <span className={item.position <= 6 ? 'highlight-no badge badge-info' : ''}>
            {item.position}
         </span>
        </td>
        <td>
            <div className="y-center pointer">
                {/*<CustomNextImage src={team.logo} width={25} height={25} alt={team.name}/>*/}
                <span className="px-1 teamName text-black">{team.name}</span>
            </div>
        </td>
        <td>{item.matches}</td>
        <td>{item.wins}</td>
        <td>{item.losses}</td>
        <td>{item.gamesBehind}</td>
        <td>{item.streak}</td>
        <td>{item.percentage}</td>
    </tr>
}

export default StandingTableRow