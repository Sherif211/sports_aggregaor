import Table from '../table/Table'
import H2HRow from './H2HRow'
import {SPORT_NAME, SPORT_SOCCER} from '../../constants'
import {memo} from 'react'
import Card from '../card/Card'

const H2H = ({items}) => {
   if (SPORT_NAME !== SPORT_SOCCER || !Array.isArray(items) || items.length === 0) return null
   let matches = []
   items.forEach(item => {
      matches.push(...item.fixtures)
   })
   const matchThead = <tr>
      <th>Head To Head</th>
   </tr>

   return <Card className='matches my-2'>
      <Table className='matchTable' head={matchThead} RowComponent={H2HRow} bodyData={matches}/>
   </Card>
}

export default memo(H2H)