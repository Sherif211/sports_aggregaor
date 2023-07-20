import Match from '../../app/components/match/Match'
import {wrapper} from '../../store'
import {fetchTitleEventData} from '../../redux/actions/eventActions'
import BreadCrumbSEO from '../../app/seo/BreadCrumbSEO'
import {generateLeagueHref} from '../../app/helpers/utilities'
import {DOMAIN} from '../../app/constants'

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
        const event = store.getState().event.event
        const leagueSlug = event.tournament?.slug
        const leagueId = event.tournament?.id
        return {
            props: {
                slug: data[0],
                paths: [
                    {
                        name: `${store.getState().event.event.tournament?.name} league`,
                        url: generateLeagueHref(leagueSlug, leagueId, true)
                    },
                    {
                        name: `${event.title}`,
                        url: `${DOMAIN}/${process.env.NEXT_PUBLIC_EVENT_PREFIX}/${data[0]}/${data[1]}`
                    }
                ]
            }
        }
    }
)

export default EventTitle