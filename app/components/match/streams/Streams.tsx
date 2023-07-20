import {memo, useEffect} from 'react'
import {connect} from 'react-redux'
import EventWays from '../EventWays'
import NordComponent from '../../stream/NordComponent'
import Card from '../../card/Card'
import H2H from '../H2H'
import Tweets from '../../tweet/Tweets'
import {Col, Row} from 'react-bootstrap'
import Incidents from '../Incidents'
import Stats from '../Stats'
import EventTabs from '../../motorsport/event-page/EventTabs'
import {SPORT_NAME, SPORT_SOCCER} from '../../../constants'
import StatsTypeTwo from '../StatsTypeTwo'
import IncidentsTypeTwo from '../IncidentsTypeTwo'

const Streams = ({event, content, hideEventWays, h2h, tweets, stats, incidents}) => {
    useEffect(() => {
        const x = setInterval(() => {
            // @ts-ignore
            if (window.loadStreams) {
                clearInterval(x)
                if (event.title) {
                    // @ts-ignore
                    window.loadStreams(event.id, 'title-event')
                } else {
                    // @ts-ignore
                    window.loadStreams(event.id, process.env.NEXT_PUBLIC_SPORT)
                }
            }
        }, 500)
    }, [])

    const getTitle = () => {
        if (!event.homeTeam)
            return event.title + ' Live Stream'
        const {homeTeam, awayTeam} = event
        return homeTeam.name + ' vs ' + awayTeam.name + ' Live Streams'
    }

    return <>
        <Card>
            <Row className="mb-5 align-items-baseline">

                    <Col md={8}>
                        <NordComponent/>
                        <div id="streams"/>
                        <br/>
                        <div dangerouslySetInnerHTML={{
                            __html:content?.content
                        }}/>
                        <br/>
                        <Row>
                            <Col md={6}>
                                {SPORT_NAME === SPORT_SOCCER &&
                                <Stats stats={stats} homeId={event?.localteam_id || event.homeTeam?.id}
                                       awayId={event?.visitorteam_id || event.awayTeam?.id}/>}
                            </Col>
                            <Col md={6}>
                                {SPORT_NAME === SPORT_SOCCER ? <Incidents incidents={incidents}/> :
                                    <IncidentsTypeTwo incidents={incidents}/>}
                            </Col>
                        </Row>
                        <H2H items={h2h}/>
                    </Col>

                    <Col md={4}>
                        {SPORT_NAME !== SPORT_SOCCER && <StatsTypeTwo/>}
                        <Tweets tweets={tweets}/>
                        <EventTabs/>
                    </Col>

            </Row>
            <div>
                {!hideEventWays && <EventWays/>}
            </div>
        </Card>
    </>
}

const mapStateToProps = state => ({
    event: state.event.event,
    content: state.general.content,
})
export default connect(mapStateToProps, null)(memo(Streams))
