import {getServerSideSitemap} from 'next-sitemap'
import {GetServerSideProps} from 'next'
import axios from 'axios'
import {stringToSlug} from '../../app/helpers/utilities'
import {DOMAIN} from '../../app/constants'
import {getPopularEventListEndpoint} from '../../app/helpers/endpoints'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    let urls = null
    await axios.get(getPopularEventListEndpoint()).then(res => {
        urls = res.data
    })
    const leaguesObj = urls?.map(item => {
        return {
            loc: `${DOMAIN}/${process.env.NEXT_PUBLIC_EVENT_PREFIX}/${item.slug ? item.slug : stringToSlug(item.name)}-live-streams/${item.id}`,
            lastmod: new Date().toISOString(),
            priority: 1
        }
    })
    const fields = [
        ...leaguesObj
    ]

    return getServerSideSitemap(ctx, fields)
}

// Default export to prevent next.js errors
export default () => {
}