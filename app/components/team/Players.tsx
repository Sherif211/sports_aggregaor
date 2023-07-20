import CustomNextImage from '../image/CustomNextImage'

const Players = ({players}) => {
    return <div className="players">
        {
            players.map(({id, shortName, logo, position}) => {
                if (shortName && logo) {
                    return <div key={id} className="d-flex justify-content-between align-items-center mb-2">
                        <div className="d-flex align-items-center">
                            <CustomNextImage className="border rounded-circle" alt={shortName} src={logo} width={40}
                                             height={40}/>
                            <strong className="ms-2" style={{fontWeight: 500}}>{shortName}</strong>
                        </div>
                        <small>{position?.name}</small>
                    </div>
                }

            })
        }
    </div>
}

export default Players