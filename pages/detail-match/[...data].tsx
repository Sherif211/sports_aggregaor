import {wrapper} from '../../store'
import Match from '../../app/components/match/Match'
import {fetchEventData} from '../../redux/actions/eventActions'
import {generateHref} from '../../app/helpers/utilities'
import BreadCrumbSEO from '../../app/seo/BreadCrumbSEO'
import {DOMAIN, LEAGUE_BASE_ROUTE} from '../../app/constants'
import ApiInterface from "../../app/helpers/ApiInterface";
import {getEventEndpoint} from "../../app/helpers/endpoints";

const DetailMatch = ({slug, paths}) => {
    return <>
        <BreadCrumbSEO paths={paths}/>
        <Match slug={slug}/>
    </>
}

// @ts-ignore
export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
        const {data} = context.params
        const res = await ApiInterface.instance.get(getEventEndpoint(data[0], data[1]));
        if (res.data.event.generalTeamsSlug)
            return {
                redirect: {
                    permanent: true,
                    destination: "/" + process.env.NEXT_PUBLIC_GENERAL_GAME_PAGE_SLUG + "/" + res.data.event.generalTeamsSlug,
                },
                props: {},
            };
        await store.dispatch(fetchEventData(data[0], data[1]))
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