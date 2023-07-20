import Table from '../table/Table'
import LineupRow from './LineupRow'
import SubstitutionsRow from './SubstitutionsRow'
import Card from '../card/Card'
import Image from 'next/image'
import {passFailFilterArray} from '../../helpers/utilities'

const Lineup = ({lineup}) => {
   if (!lineup) return null
   const {team, formation, lineupsSorted, substitutions} = lineup

   const [mainLineup, benchLineup] = passFailFilterArray(lineupsSorted, (item) => item.position !== null)

   const lineupHeadTable = <tr>
      <th style={{width: '32px'}}>No.</th>
      <th>Name</th>
      <th style={{width: '96px'}}>Position</th>
   </tr>

   const lineupSubstitutesHeadTable = null
   return <>
      <Card>
         <div className='lineupHeader d-flex align-items-center' style={{marginBottom: 30}}>
            <Image src={team.logo} width={30} height={30}
                   alt={team.name}/>
            <span className='formation ms-2'>{formation}</span>
         </div>
         <Table className='lineUpsHome' head={lineupHeadTable}
                bodyData={mainLineup}
                RowComponent={LineupRow}
         />
         <div className='mb-2'><strong>Bench</strong></div>

         <Table className='lineUpsHome' head={lineupHeadTable}
                bodyData={benchLineup}
                RowComponent={LineupRow}
         />

         <div className='mb-2'><strong>Substitutes</strong></div>

         <Table className='lineUpsAway' head={lineupSubstitutesHeadTable}
                bodyData={substitutions}
                RowComponent={SubstitutionsRow}
         />
      </Card>
   </>
}

export default Lineup