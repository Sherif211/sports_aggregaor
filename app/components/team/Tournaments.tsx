import CustomNextImage from '../image/CustomNextImage'

const Tournaments = ({leagues}) => {
    return <div className="tournaments">
        {
            leagues.map(({tournament}) => {
                return <div key={tournament.id}>
                    <a href={`/league/${tournament.slug}-live-streams/${tournament.id}`}>
                        <div className="tournament">
                            {tournament.logo ?
                                <CustomNextImage alt={tournament.shortName ?? tournament.name} src={tournament.logo}
                                                 width={50}
                                                 height={50}/> : null}
                            <span className="name text-black">{tournament.shortName ?? tournament.name}</span>
                        </div>
                    </a>
                </div>
            })
        }
    </div>
}

export default Tournaments