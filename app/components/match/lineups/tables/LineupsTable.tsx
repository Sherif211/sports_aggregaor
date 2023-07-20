import {memo} from 'react'
import {Table} from 'react-bootstrap'
import BaseHead from '../theads/BaseHead'
import BaseRow from '../rows/BaseRow'

const LineupsTable = ({cols = 'Summary', sort, sorts, onWhichLineupClick, homeTeam, awayTeam, players}) => {
    return <Table>
        <BaseHead sort={sort} sorts={sorts} onWhichLineupClick={onWhichLineupClick} homeTeam={homeTeam}
                  awayTeam={awayTeam}
                  cols={cols}/>
        <tbody>
        {
            players.map(item => {
                return <BaseRow key={item.player.slug} item={item} homeTeam={homeTeam}
                                awayTeam={awayTeam} cols={cols}/>
            })
        }
        </tbody>
    </Table>

}

export default memo(LineupsTable)