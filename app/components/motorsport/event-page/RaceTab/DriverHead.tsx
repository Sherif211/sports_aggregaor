import {memo} from 'react'

const DriverHead = ({race}) => {
    return <tr>
        <th>Pos</th>
        <th>Drivers</th>
        {race && <th>Grid</th>}
        {race && <th>Pits</th>}
        <th>Laps</th>
        {race && <th>Pts</th>}
        <th>Time</th>
        {!race && <th>Time</th>}
    </tr>

}

export default memo(DriverHead)