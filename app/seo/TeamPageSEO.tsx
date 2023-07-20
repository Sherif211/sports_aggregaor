import {LogoJsonLd, NextSeo} from 'next-seo'
import {generateTeamHref} from '../helpers/utilities'
import BreadCrumbSEO from './BreadCrumbSEO'
import {memo} from 'react'
import Head from 'next/head'

const TeamPageSeo = ({team, content, paths}) => {
    const teamUrl = generateTeamHref(team.slug, team.id, true)
    return <>
        <LogoJsonLd
            logo={team?.logo}
            url={teamUrl}
        />
        <NextSeo
            title={content?.metaTitle}
            description={content?.metaDescription}
            canonical={teamUrl}
            openGraph={{
                type: 'website',
                url: teamUrl,
                title: content.metaTitle,
                description: content.metaDescription,
                images: [
                    {
                        url: team?.logo,
                        width: 96,
                        height: 96,
                        alt: team.name
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

export default memo(TeamPageSeo)