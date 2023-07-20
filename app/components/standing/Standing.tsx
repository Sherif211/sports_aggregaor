import CardTable from '../table/CardTable'
import StandingTableRow from './StandingTableRow'
import {memo} from 'react'
import {HAVE_STANDING_SPORTS, SPORT_NAME} from '../../constants'

const Standing = ({tableRows, additionalData = null}) => {
    if (!HAVE_STANDING_SPORTS.includes(SPORT_NAME)) return null
    const standingHeadTable = <tr>
        <th style={{width: '32px'}}>No.</th>
        <th>Team</th>
        <th>W</th>
        <th>L</th>
        <th>D</th>
        <th>P</th>
    </tr>
    return <>
        <CardTable className="standingTable"
                   head={standingHeadTable}
                   bodyData={tableRows}
                   RowComponent={StandingTableRow}
                   additionalData={additionalData}
        />
    </>
}

export default memo(Standing)