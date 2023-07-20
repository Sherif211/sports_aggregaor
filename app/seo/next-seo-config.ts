import {APP_NAME, DOMAIN} from '../constants'

export default {
    defaultTitle: `${process.env.NEXT_PUBLIC_TITLE}`,
    titleTemplate: `%s`,
    description: `${process.env.NEXT_PUBLIC_META_DESCRIPTION}`,
    canonical: DOMAIN,
    noindex: true,
    openGraph: {
        url: DOMAIN,
        title: `${process.env.NEXT_PUBLIC_TITLE}`,
        description: `${process.env.NEXT_PUBLIC_META_DESCRIPTION}`,
        type: 'website',
        images: [
            {
                url: `${process.env.NEXT_PUBLIC_FAVICON}`,
                width: 96,
                height: 96,
                alt: APP_NAME
            }
        ],
        twitter: {
            cardType: 'summary'
        },
        site_name: APP_NAME
    }

}
