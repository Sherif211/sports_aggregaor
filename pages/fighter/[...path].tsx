import dynamic from 'next/dynamic'
import {Col, Row} from 'react-bootstrap'
import {connect} from 'react-redux'
import {wrapper} from '../../store'
import {fetchTeam} from '../../redux/actions/teamActions'
import TeamHeader from '../../app/components/team/TeamHeader'
import Matches from '../../app/components/match/Matches'
import Tournaments from '../../app/components/team/Tournaments'
import Card from '../../app/components/card/Card'
import TeamPageSeo from '../../app/seo/TeamPageSEO'
import Tweets from '../../app/components/tweet/Tweets'
import {isValidArray} from '../../app/helpers/utilities'
import {FC} from 'react'
import {DOMAIN, TEAM_BASE_ROUTE} from '../../app/constants'

const Players = dynamic(() => import('../../app/components/team/Players')) as FC<any>
const VideoSlider = dynamic(() => import('../../app/components/videos/VideoSlider')) as FC<any>

const Team = ({team, matches, content, players, tournaments, tweets, paths, videos}) => {
    return <>
        <TeamPageSeo team={team} content={content} paths={paths}/>
        <div className="team">
            <TeamHeader team={team} heading={content?.heading}/>
            <Row>
                <Col md={8}>
                    <Card className="mb-3">
                        {
                            matches.map((league, i) => {
                                return <Matches key={i} league={league}/>
                            })
                        }
                    </Card>
                    <Card className="my-3" dangerouslySetInnerHTML={{__html: content?.content ?? ''}}/>
                    <Row className="mb-3">
                        <Col md={6}>
                            {isValidArray(players) && <Card className="mb-3">
                                <div className="mb-2"><strong>Players</strong></div>
                                <Players players={players}/>
                            </Card>}
                        </Col>
                        <Col md={6}>
                            <Card>
                                <div className="mb-2"><strong>Leagues</strong></div>
                                <Tournaments leagues={tournaments}/>
                            </Card>
                            {isValidArray(videos) && <Card className="mb-3">
                                <VideoSlider videos={videos}/>
                            </Card>}
                        </Col>
                    </Row>
                </Col>
                <Col md={4}>
                    <Tweets tweets={tweets}/>
                </Col>
            </Row>

        </div>
    </>
}

// @ts-ignore
export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    const {path} = context.params
    const name = (path[0].replace('-live-streams', '')).replace(/-/g, ' ')
    await store.dispatch(fetchTeam(path[1], name))
    return {
        props: {
            slug: path[0],
            paths: [
                {
                    name: store.getState().team.team.name,
                    url: `${DOMAIN}/${TEAM_BASE_ROUTE}/${path[0]}/${path[1]}`
                }
            ]
        }
    }
})

const mapStateToProps = state => ({
    team: state.team.team,
    matches: state.team.matches,
    content: state.team.content,
    players: state.team.players,
    tournaments: state.team.tournaments,
    tweets: state.team.tweets,
    videos: state.team.videos
})
export default connect(mapStateToProps, null)(Team)
