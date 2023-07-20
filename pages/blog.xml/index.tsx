import {getServerSideSitemap} from 'next-sitemap'
import {GetServerSideProps} from 'next'
import axios from 'axios'
import {getBlogsEndpoint} from '../../app/helpers/endpoints'
import {DOMAIN} from '../../app/constants'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    let urls = null
    await axios.get(getBlogsEndpoint()).then(res => {
        urls = res.data
    })
    const blogsObj = urls?.map(item => {
        return {
            loc: `${DOMAIN}/${process.env.NEXT_PUBLIC_BLOG_BASE_ROUTE}/${item.slug}`,
            lastmod: new Date().toISOString()
        }
    })
    const fields = [
        ...blogsObj
    ]

    return getServerSideSitemap(ctx, fields)
}

// Default export to prevent next.js errors
export default () => {
}