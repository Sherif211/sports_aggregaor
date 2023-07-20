import CardTable from '../table/CardTable'
import LeagueStandingTableRow from './LeagueStandingTableRow'
import {Col, Form, Row} from 'react-bootstrap'
import {useState} from 'react'
import {SPORT_NAME} from '../../constants'


const LeagueStanding = ({standings, standingTitles, defaultTitle}) => {
   const [standing, setStanding] = useState(standingTitles[0])

   const standingHeadTable = <tr>
      <th style={{width: '32px'}}>No.</th>
      <th>Team</th>
      <th title='Points'>Pts</th>
      <th title='Won'>W</th>
      <th title='lost'>L</th>
      {SPORT_NAME !== 'soccer' && <th title='games behind'>GB</th>}
      <th
         title={`${SPORT_NAME === 'soccer' ? 'D' : 'Str'}`}>{`${SPORT_NAME === 'soccer' ? 'D' : 'Str'}`}</th>
      <th
         title={`${SPORT_NAME === 'soccer' ? 'P' : 'PCT'}`}>{`${SPORT_NAME === 'soccer' ? 'P' : 'PCT'}`}</th>
      {SPORT_NAME === 'score' && <th>Goals</th>}
   </tr>

   const select = standingTitles.length >= 2 ? <Row className='mb-3'>
      <Col md={{span: 4, offset: 8}}>
         <Form.Select size='sm' onChange={option => setStanding(option.target.value)}>
            {
               standingTitles.map(item => {
                  return <option key={item ? item : defaultTitle}
                                 value={item ? item : defaultTitle}>{item ? item : defaultTitle}</option>
               })
            }
            {standingTitles.length === 0 && <option key={defaultTitle} value={defaultTitle}>{defaultTitle}</option>}
         </Form.Select>
      </Col>
   </Row> : null

   return <>
      <CardTable className='standingTable mb-3'
                 head={standingHeadTable}
                 bodyData={standings[standingTitles.length === 0 ? 0 : standingTitles.indexOf(standing)]?.tableRows}
                 RowComponent={LeagueStandingTableRow}
                 topRender={select}
      />
   </>
}

export default LeagueStanding