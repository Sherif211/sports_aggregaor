import {LogoJsonLd, NextSeo} from 'next-seo'
import {generateLeagueHref} from '../helpers/utilities'
import BreadCrumbSEO from './BreadCrumbSEO'
import {memo} from 'react'
import Head from 'next/head'

const LeaguePageSeo = ({league, content, paths}) => {
    const leagueUrl = generateLeagueHref(league.slug, league.id, true)
    return <>
        <LogoJsonLd
            logo={league?.logo}
            url={leagueUrl}
        />
        <NextSeo
            title={content?.metaTitle}
            description={content?.metaDescription}
            canonical={leagueUrl}
            openGraph={{
                type: 'website',
                url: leagueUrl,
                title: content?.metaTitle,
                description: content?.metaDescription,
                images: [
                    {
                        url: league?.logo,
                        width: 96,
                        height: 96,
                        alt: league?.name
                    }
                ]
            }}
            twitter={{
                cardType: 'summary'
            }}
        />
        <Head>
            <meta name="keywords" content={content?.metaKeywords}/>
        </Head>
        <BreadCrumbSEO paths={paths}/>
    </>
}

export default memo(LeaguePageSeo)