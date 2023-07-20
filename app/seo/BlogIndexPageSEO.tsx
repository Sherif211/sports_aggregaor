import {NextSeo} from 'next-seo'
import {memo} from 'react'
import {APP_NAME, DOMAIN} from '../constants'

const TeamPageSeo = () => {
    return <>
        <NextSeo
            title={`Blog - ${APP_NAME}`}
            description={`${APP_NAME} Blog posts`}
            canonical={DOMAIN}
            openGraph={{
                type: 'website',
                url: DOMAIN,
                title: 'Blog'
            }}
            twitter={{
                cardType: 'summary'
            }}
        />
    </>
}

export default memo(TeamPageSeo)