import MatchRow from './MatchRow'
import Table from '../table/Table'
import MatchTableHeadRow from './MatchTableHeadRow'

const MatchesTable = ({matches}) => {
   return <div className='matches'>
      <Table className='matchTable' head={<MatchTableHeadRow/>} RowComponent={MatchRow} bodyData={matches}/>
   </div>
}

export default MatchesTable