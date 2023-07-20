import {wrapper} from '../../store'
import Match from '../../app/components/match/Match'
import {fetchEventData} from '../../redux/actions/eventActions'
import {generateHref} from '../../app/helpers/utilities'
import BreadCrumbSEO from '../../app/seo/BreadCrumbSEO'
import {DOMAIN, LEAGUE_BASE_ROUTE} from '../../app/constants'

const DetailMatch = ({slug, paths}) => {
    return <>
        <BreadCrumbSEO paths={paths}/>
        <Match slug={slug}/>
    </>
}

export const getServerSideProps = wrapper.getServerSideProps(
    store => async (context) => {
        const {data} = context.params
        let slug = data[0];
        if (process.env.NEXT_PUBLIC_GENERAL_GAME_PAGE_POST_FIX)
            slug = slug.replace(process.env.NEXT_PUBLIC_GENERAL_GAME_PAGE_POST_FIX,'')
        await store.dispatch(fetchEventData(slug,'general'))
        return {
            props: {
                slug: data[0],
                paths: [
                    {
                        name: `${store.getState().event.event.tournament?.name} league`,
                        url: `${DOMAIN}${generateHref(LEAGUE_BASE_ROUTE, store.getState().event.event.tournament?.slug, store.getState().event.event.tournament?.id)}`
                    },
                    {
                        name: `${store.getState().event.event.name} event`,
                        url: `${DOMAIN}/${process.env.NEXT_PUBLIC_EVENT_PREFIX}/${data[0]}/${data[1]}`
                    }
                ]
            }

        }
    }
)

export default DetailMatch