import {memo} from 'react'

const TeamStandingHead = () => {
    return <tr>
        <th style={{width: '42px'}}>Pos</th>
        <th>Team</th>
        <th>Pts</th>
    </tr>

}

export default memo(TeamStandingHead)