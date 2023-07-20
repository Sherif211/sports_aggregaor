import {Tab, Tabs} from 'react-bootstrap'

const LineupTabs = ({tabs, setSelectedTab}) => {
    return <Tabs defaultActiveKey={tabs?.[0]} id="uncontrolled-tab" onSelect={(tab) => setSelectedTab(tab)}
                 className="mb-3">
        {
            tabs.map(item => {
                return <Tab key={item} eventKey={item} title={item}/>
            })
        }
    </Tabs>

}

export default LineupTabs