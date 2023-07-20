import {memo} from 'react'

const MatchTableHeadRow = () => {
   return <tr>
      <th>MATCH</th>
      <th className='text-center'>TIME</th>
      <th className='hideOnMobile text-center'>LOCATION</th>
   </tr>
}

export default memo(MatchTableHeadRow)