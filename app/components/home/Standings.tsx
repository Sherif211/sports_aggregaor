import {Form} from 'react-bootstrap'
import Standing from '../standing/Standing'
import Card from '../card/Card'
import {memo, useState} from 'react'
import {isValidArray} from '../../helpers/utilities'

const Standings = ({standings}) => {
    const [selectedStanding, setSelectedStanding] = useState(0)
    if (!isValidArray(standings)) return null
    const onStandingChange = (e) => {
        setSelectedStanding(e.target.value)
    }
    return <Card className="mb-3">
        <div className="mb-2">
            <strong>Standings</strong>
        </div>
        <div className="mb-1">
            <Form.Select aria-label="select" onChange={onStandingChange}>
                {
                    standings.map((standingsTable, index) => {
                        return <option key={standingsTable.standingsTables[0].tournament.id}
                                       value={index}>{standingsTable.standingsTables[0].tournament.name}</option>
                    })
                }
            </Form.Select>
        </div>
        <Standing tableRows={standings[selectedStanding].standingsTables[0].tableRows}/>
    </Card>

}

export default memo(Standings)