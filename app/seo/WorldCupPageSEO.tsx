import {LogoJsonLd, NextSeo} from 'next-seo'
import BreadCrumbSEO from './BreadCrumbSEO'
import {memo} from 'react'
import {DOMAIN} from '../constants'

const WorldCupPageSEO = () => {
    return <>
        <LogoJsonLd
            logo={`${DOMAIN}/static/fifa-world-cup-2022.png`}
            url={`${DOMAIN}/${process.env.NEXT_PUBLIC_WORLD_CUP_PREFIX}`}
        />
        <NextSeo
            title="Watch FIFA World Cup 2022 Streams on Any Device"
            description="Watch FIFA Qatar World Cup 2022 live streams on any device, without cable TV. All matches are streamed live for free!"
            canonical={`${DOMAIN}/${process.env.NEXT_PUBLIC_WORLD_CUP_PREFIX}`}
            openGraph={{
                type: 'website',
                url: `${DOMAIN}/${process.env.NEXT_PUBLIC_WORLD_CUP_PREFIX}`,
                title: 'Watch FIFA World Cup 2022 Streams on Any Device',
                description: 'Watch FIFA Qatar World Cup 2022 live streams on any device, without cable TV. All matches are streamed live for free!',
                images: [
                    {
                        url: `${DOMAIN}/static/fifa-world-cup-2022.png`,
                        width: 196,
                        height: 196,
                        alt: 'FIFA World Cup 2022'
                    }
                ]
            }}
            twitter={{
                cardType: 'summary'
            }}
        />

        <BreadCrumbSEO paths={[
            {
                name: 'World Cup Streams',
                url: `${DOMAIN}/${process.env.NEXT_PUBLIC_WORLD_CUP_PREFIX}`
            }
        ]}/>
    </>
}

export default memo(WorldCupPageSEO)