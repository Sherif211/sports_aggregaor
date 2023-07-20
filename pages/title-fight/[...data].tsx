import Match from '../../app/components/match/Match'
import {wrapper} from '../../store'
import {fetchTitleEventData} from '../../redux/actions/eventActions'
import BreadCrumbSEO from '../../app/seo/BreadCrumbSEO'
import {generateHref} from '../../app/helpers/utilities'
import {DOMAIN, LEAGUE_BASE_ROUTE} from '../../app/constants'

const EventTitle = ({paths}) => {
    return <>
        <BreadCrumbSEO paths={paths}/>
        <Match/>
    </>
}

export const getServerSideProps = wrapper.getServerSideProps(
    store => async (context) => {
        const {data} = context.params
        await store.dispatch(fetchTitleEventData(data[0], data[1]))
        return {
            props: {
                slug: data[0],
                paths: [
                    {
                        name: `${store.getState().event.event.tournament.name} league`,
                        url: `${DOMAIN}${generateHref(LEAGUE_BASE_ROUTE, store.getState().event.event.tournament.slug, store.getState().event.event.tournament.id)}`
                    },
                    {
                        name: `${store.getState().event.event.name} title fight`,
                        url: `${DOMAIN}/${process.env.NEXT_PUBLIC_EVENT_PREFIX}/${data[0]}/${data[1]}`
                    }
                ]
            }
        }
    }
)

export default EventTitle