import dynamic from 'next/dynamic'
import {FC, useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {NextSeo} from 'next-seo'
import {fetchLineupsData} from '../../../redux/actions/eventActions'
import MatchNav from './MatchNav'
import DateAndLeagueSection from './detail/DateAndLeagueSection'
import ResultSection from './detail/ResultSection'
import {generateEventHref, generateMatchDesc, generateMatchTitle, isValidArray} from '../../helpers/utilities'
import Script from 'next/script'
import Head from 'next/head'
import {APP_NAME, DOMAIN, SPORT_NAME, SPORT_SOCCER} from '../../constants'
import StatsTypeTwo from './StatsTypeTwo'

const Incidents = dynamic(() => import('./Incidents')) as FC<any>
const Stats = dynamic(() => import('./Stats')) as FC<any>
const H2H = dynamic(() => import('./H2H')) as FC<any>
const Loading = dynamic(() => import('../loading/Loading')) as FC<any>
const Lineups = dynamic(() => import('../lineups/Lineups')) as FC<any>
const Standing = dynamic(() => import('../standing/Standing')) as FC<any>
const Streams = dynamic(() => import('./streams/Streams')) as FC<any>

const Match = ({
                   standingsTables = null,
                   event,
                   lineups = null,
                   fetchLineupsData = null,
                   h2h = [],
                   tweets = [],
                   stats = null,
                   incidents = null,
                   content = null
               }: any) => {

    const [selectedTab, setSelectedTab] = useState('#livestream')
    const [loading, setLoading] = useState(false)
    const onNavClickHandler = (selectedTab) => {
        if (selectedTab === '#standing') {
        } else if (selectedTab === '#lineups') {
            setLoading(true)
            fetchLineupsData(event.id)
        }
        if (!selectedTab.startsWith('https://') && selectedTab.startsWith('#')) {
            setSelectedTab(selectedTab)
        }
    }

    useEffect(() => {
        if (lineups) {
            setLoading(false)
        }
    }, [lineups])

    if (Object.keys(event).length === 0) return <div/>
    const homeId = event?.homeTeam?.id
    const awayId = event?.awayTeam?.id
    const standing = standingsTables?.[0]?.tableRows
    const title = content && content.metaTitle ? content.metaTitle:  generateMatchTitle(event)
    const description = content && content.metaDescription ? content.metaDescription:  generateMatchDesc(event)
    return <>
        <Script src="https://scdn.dev/js/new-streams-without-jquery.js?v1.2222222"/>
        <NextSeo
            title={title}
            description={description}
            canonical={`${DOMAIN}${generateEventHref(event.title, event.slug, event.id)}`}
            openGraph={{
                type: 'website',
                url: `${DOMAIN}${generateEventHref(event.title, event.slug, event.id)}`,
                title: content?.metaTitle ?? generateMatchTitle(event),
                description: description,
                images: [
                    {
                        url: process.env.NEXT_PUBLIC_FAVICON,
                        width: 96,
                        height: 96,
                        alt: APP_NAME
                    }
                ]
            }}
        />
        <Head>
            <meta name="keywords" content={content?.metaKeywords}/>
        </Head>

        <div className="matchDetail">
            <div className="matchDetail--header">
                <DateAndLeagueSection event={event}/>
                <ResultSection event={event}/>
            </div>
        </div>
        <br/>
        <MatchNav onNavClickHandler={onNavClickHandler} selectedTab={selectedTab} tabs={{
            'Live Stream': true,
            'Standing': isValidArray(standing),
            'Line Ups': true,
            'H2H': isValidArray(h2h),
            'Stats': isValidArray(stats),
            'Incidents': isValidArray(incidents)

        }}/>


        <div className="container my-4">
            {['#livestream', '#aboutmatch'].includes(selectedTab) &&
            <Streams h2h={h2h} tweets={tweets} incidents={incidents} stats={stats}
                     hideEventWays={false}/>}
            {selectedTab === '#standing' &&
            <Standing tableRows={standingsTables?.[0]?.tableRows ?? []}
                      additionalData={{
                          homeTeamId: homeId,
                          awayTeamId: awayId
                      }}
            />}
            {loading && <Loading loading={loading}/>}
            {selectedTab === '#lineups' && <Lineups lineups={lineups} event={event} loading={loading}/>}
            {selectedTab === '#h2h' && <H2H items={h2h}/>}
            {selectedTab === '#stats' && (SPORT_NAME === SPORT_SOCCER ?
                <Stats stats={stats} homeId={homeId} awayId={awayId}/> : <StatsTypeTwo/>)}
            {selectedTab === '#incidents' && <Incidents incidents={incidents}/>}
        </div>

    </>


}


const mapStateToProps = state => ({
    event: state.event.event,
    lineups: state.event.lineups,
    h2h: state.event.h2h,
    tweets: state.event.tweets,
    stats: state.event.stats,
    incidents: state.event.incidents,
    content: state.event.content
})
export default connect(mapStateToProps, {
    fetchLineupsData
})(Match)
