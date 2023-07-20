import { getServerSideSitemapIndex } from 'next-sitemap'
import { GetServerSideProps } from 'next'
import {DOMAIN} from "../../app/constants";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    // Method to source urls from cms
    // const urls = await fetch('https//example.com/api')

    return getServerSideSitemapIndex(ctx, [
        `${DOMAIN}/leagues.xml`,
        `${DOMAIN}/blog.xml`,
        `${DOMAIN}/world-cup-streams.xml`,
        `${DOMAIN}/popular-events.xml`,
        `${DOMAIN}/teams.xml`,
    ])
}

// Default export to prevent next.js errors
export default function SitemapIndex() {}