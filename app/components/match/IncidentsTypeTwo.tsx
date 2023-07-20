import {extractNumber, isValidArray} from '../../helpers/utilities'
import {Accordion} from 'react-bootstrap'
import Card from '../card/Card'

const IncidentsTypeTwo = ({incidents}) => {
    if (!isValidArray(incidents)) return null
    const quartersIndex = []
    const quarters = incidents.filter((item, index) => {
        if (item.incidentType === 'period') {
            quartersIndex.push(index)
            return true
        }
    })

    return <Card className="mb-2">
        <div className="mb-2"><strong>Incidents</strong></div>
        <Accordion defaultActiveKey="0">
            {
                quarters.map((item, index) => {
                    return <Accordion.Item key={item.text} eventKey={index}>
                        <Accordion.Header>{`${item.text} ${item.homeScore} - ${item.awayScore}`}</Accordion.Header>
                        <Accordion.Body>
                            {
                                incidents.slice(quartersIndex[index] + 1, quartersIndex[index + 1]).map((incidentItem, incidentItemIndex) => {
                                    return <div key={incidentItem.id}
                                                className="d-flex align-items-center justify-content-between py-1 listItem-item border-bottom">
                                        <div className="w-45">
                                            {incidentItem.isHome ? <div className="d-flex align-items-center">
                                                <b className="text-success pe-2">{extractNumber(incidentItem.incidentClass)}</b>
                                                <div className="d-flex flex-column ps-1">
                                                    <b>{`${incidentItem.homeScore} - ${incidentItem.awayScore}`}</b>
                                                    <span className="font-size-xsmall">{incidentItem.player?.name ?? incidentItem?.playerName}</span>
                                                </div>
                                            </div> : null}
                                        </div>
                                        <time
                                            className="font-size-xsmall text-secondary">{`${incidentItem.time}'`}</time>
                                        <div className="w-45">
                                            {!incidentItem.isHome ?
                                                <div className="d-flex align-items-center justify-content-end">
                                                    <div className="d-flex flex-column align-items-center w-100">
                                                        <b>{`${incidentItem.homeScore} - ${incidentItem.awayScore}`}</b>
                                                        <span
                                                            className="font-size-xsmall">{incidentItem.player?.name}</span>
                                                    </div>
                                                    <b className="text-success ps-2">{extractNumber(incidentItem.incidentClass)}</b>
                                                </div> : null}
                                        </div>
                                    </div>
                                })
                            }
                        </Accordion.Body>
                    </Accordion.Item>
                })
            }
        </Accordion>
    </Card>

}

export default IncidentsTypeTwo