import {getServerSideSitemap} from 'next-sitemap'
import {GetServerSideProps} from 'next'
import axios from 'axios'
import {generateLeagueHref, stringToSlug} from '../../app/helpers/utilities'
import {getLeagueListEndpoint} from '../../app/helpers/endpoints'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    let urls = null
    await axios.get(getLeagueListEndpoint()).then(res => {
        urls = res.data
    })

    const leaguesObj = urls?.map(item => {
        return {
            loc: generateLeagueHref(item.slug ? item.slug : stringToSlug(item.name), item.id, true),
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