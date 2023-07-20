import {LogoJsonLd, NextSeo} from 'next-seo'
import {memo} from 'react'
import {APP_NAME, DOMAIN} from '../constants'

const HomePageSeo = ({metaTitle, metaDescription}) => {
    return <>
        <LogoJsonLd
            logo={process.env.NEXT_PUBLIC_FAVICON}
            url={DOMAIN}
        />
        <NextSeo
            title={metaTitle ?? process.env.NEXT_PUBLIC_TITLE}
            description={metaDescription ?? process.env.NEXT_PUBLIC_META_DESCRIPTION}
            canonical={DOMAIN}
            openGraph={{
                type: 'website',
                url: DOMAIN,
                title: metaTitle,
                description: metaDescription,
                images: [
                    {
                        url: process.env.NEXT_PUBLIC_FAVICON,
                        width: 96,
                        height: 96,
                        alt: APP_NAME
                    }
                ]
            }}
            twitter={{
                cardType: 'summary'
            }}
        />
    </>
}

export default memo(HomePageSeo)