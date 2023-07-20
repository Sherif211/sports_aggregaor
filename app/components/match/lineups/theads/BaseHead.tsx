import {Nav} from 'react-bootstrap'
import CustomNextImage from '../../../image/CustomNextImage'
import ArrowIcon from '../../../icons/ArrowIcon'

const BaseHead = ({sort, sorts, onWhichLineupClick, homeTeam, awayTeam, cols}) => {
    return <thead>
    <tr className="text-center">
        <th className="w-24px">#</th>
        <th>
            <Nav onSelect={onWhichLineupClick} variant="pills" defaultActiveKey="#both">
                <Nav.Item className="me-1">
                    <Nav.Link className="pointer border rounded-pill px-2 py-1" as="span" href="#both">
                        <CustomNextImage width={20} height={20} alt={homeTeam.name}
                                         src={homeTeam.logo}/>
                        <span className="px-1">+</span>
                        <CustomNextImage width={20} height={20} alt={awayTeam.name}
                                         src={awayTeam.logo}/>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className="me-1">
                    <Nav.Link className="pointer border rounded-circle p-1" as="span" eventKey="#home">
                        <CustomNextImage width={20} height={20} alt={homeTeam.name}
                                         src={homeTeam.logo}/>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className="pointer border rounded-circle p-1" as="span" eventKey="#away">
                        <CustomNextImage width={20} height={20} alt={awayTeam.name}
                                         src={awayTeam.logo}/>
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </th>
        {
            cols.map(item => {
                return <th key={item.key} onClick={() => sort(item.key)}
                           className="pointer">{item.title} {(sorts.key === item.key) ? sorts.type === 'desc' ?
                    <ArrowIcon/> :
                    <ArrowIcon className="top"/> : <ArrowIcon/>}
                </th>
            })
        }
    </tr>
    </thead>

}

export default BaseHead