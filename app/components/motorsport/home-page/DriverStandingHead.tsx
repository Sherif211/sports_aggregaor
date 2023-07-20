import {memo} from 'react'

const DriverStandingHead = () => {
    return <tr>
        <th>Pos</th>
        <th>Drivers</th>
        <th>Wins</th>
        <th>Pole positions</th>
        <th>Podiums</th>
        <th>Pts</th>
    </tr>

}

export default memo(DriverStandingHead)