import {memo, useState} from 'react'
import {isValidArray} from '../../helpers/utilities'
import StandingTableTypeTwoRow from '../standing/StandingTableTypeTwoRow'
import Table from '../table/Table'
import Card from '../card/Card'
import {Form} from 'react-bootstrap'

const StandingsTypeTwo = ({standings}) => {
    const [selectedStanding, setSelectedStanding] = useState(0)
    if (!isValidArray(standings)) return null
    const onStandingChange = (e) => {
        setSelectedStanding(e.target.value)
    }
    const head = <tr className="text-center">
        <th style={{width: '32px'}}></th>
        <th></th>
        <th>P</th>
        <th>W</th>
        <th>L</th>
        <th>GB</th>
        <th>Str</th>
        <th>PCT</th>
    </tr>
    return <Card className="mb-3">
        <div className="mb-2">
            <strong>Standings</strong>
        </div>
        <div className="mb-1">
            <Form.Select aria-label="select" onChange={onStandingChange}>
                {
                    standings.map((standing, index) => {
                        return <option key={standing.id}
                                       value={index}>{standing.name}</option>
                    })
                }
            </Form.Select>
        </div>
        <Table className="standingTable"
               head={head}
               bodyData={standings[selectedStanding].rows}
               RowComponent={StandingTableTypeTwoRow}
        />
    </Card>

}

export default memo(StandingsTypeTwo)