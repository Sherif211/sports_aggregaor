import {getServerSideSitemap} from 'next-sitemap'
import {GetServerSideProps} from 'next'
import axios from 'axios'
import {stringToSlug} from '../../app/helpers/utilities'
import {DOMAIN, SPORT_NAME, TEAM_BASE_ROUTE} from '../../app/constants'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    let urls = null
    await axios.get(`https://scdn.dev/api/top-teams/${SPORT_NAME}`).then(res => {
        urls = res.data
    })
    const leaguesObj = urls?.map(item => {
        return {
            loc: `${DOMAIN}/${TEAM_BASE_ROUTE}/${item.slug ? item.slug : stringToSlug(item.name)}-live-streams/${item.id}`,
            lastmod: new Date().toISOString()
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