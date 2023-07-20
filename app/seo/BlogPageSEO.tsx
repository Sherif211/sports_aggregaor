import {NextSeo} from 'next-seo'
import {generateBlogHref} from '../helpers/utilities'
import BreadCrumbSEO from './BreadCrumbSEO'
import {memo} from 'react'
import {DOMAIN} from '../constants'

const TeamPageSeo = ({blog, paths}) => {
    return <>
        <NextSeo
            title={blog.title}
            canonical={`${DOMAIN}${generateBlogHref(blog.slug)}`}
            openGraph={{
                type: 'website',
                url: `${DOMAIN}${generateBlogHref(blog.slug)}`,
                title: blog.title
            }}
            twitter={{
                cardType: 'summary'
            }}
        />
        <BreadCrumbSEO paths={paths}/>
    </>
}

export default memo(TeamPageSeo)