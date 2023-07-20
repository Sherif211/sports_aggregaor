import {FC, memo, useState} from 'react'
import {SPORT_MOTORSPORT, SPORT_NAME} from '../../../constants'
import {Nav} from 'react-bootstrap'
import Info from './InfoTab/InfoTabContent'
import dynamic from 'next/dynamic'

const Race = dynamic(() => import('./RaceTab/RaceTabContent')) as FC<any>

const EventTabs = () => {
    const [selectedStanding, setSelectedStanding] = useState('#INFO')
    if (SPORT_NAME !== SPORT_MOTORSPORT) return null

    const onNavClickHandler = (selectedTab) => {
        setSelectedStanding(selectedTab)
    }
    return <>
        <Nav onSelect={onNavClickHandler} className="matchDetailNav me-auto" activeKey={selectedStanding}
             defaultActiveKey="#INFO">
            <div className="matchDetail--container mb-2">
                <Nav.Link href="#RACE">RACE</Nav.Link>
                <Nav.Link href="#INFO">INFO</Nav.Link>
            </div>
        </Nav>
        {selectedStanding === '#RACE' ? <Race/> : <Info/>}
    </>


}

export default memo(EventTabs)