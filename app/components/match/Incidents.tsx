import IncidentItem from './IncidentItem'
import Card from '../card/Card'

const Incidents = ({incidents}) => {
    if (!incidents || incidents.length === 0) return null
    return <Card borderless={false} className="px-md-2">
        <div className="mb-2"><strong>Incidents</strong></div>
        <div className="d-flex flex-column flex-column-reverse">
            {
                incidents.map((item, index) => {
                    return <IncidentItem key={item.mainId} incident={item} isFirstItem={index === 0}/>
                })
            }
        </div>
    </Card>
}

export default Incidents