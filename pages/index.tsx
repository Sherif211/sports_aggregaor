import {wrapper} from '../store'
import Home from '../app/components/home/Home'
import {fetchHomePageData} from '../redux/actions/homeAction'
import {getDate} from '../app/helpers/utilities'
import {connect} from 'react-redux'
import HomePageSeo from '../app/seo/HomePageSEO'
import {SPORT_MOTORSPORT, SPORT_NAME} from "../app/constants";

const HomePage = ({metaTitle, metaDescription}) => {
    return <>
        <HomePageSeo metaDescription={metaDescription} metaTitle={metaTitle}/>
        {process.env.NEXT_PUBLIC_ALERT_LINK ? (
            <>
                <div className="text-center">

                    {/* Safe link to the own website *//* eslint-disable-next-line react/jsx-no-target-blank */}
                    <a style={{display:'block'}} target="_blank"  href={process.env.NEXT_PUBLIC_ALERT_LINK} className={`alert alert-${process.env.NEXT_PUBLIC_ALERT_TYPE}`} role="alert">
                            {process.env.NEXT_PUBLIC_ALERT_TEXT}
                        </a>
                </div>
            </>
        ) : ''}
        <Home/>
    </>
}

export const getServerSideProps = wrapper.getServerSideProps(
    store => async (context) => {
        const storeState = store.getState()
        const endpoint = storeState.sport.endpoint
        const date = SPORT_NAME === SPORT_MOTORSPORT ? 'live' : getDate()
        console.log(endpoint);

        await store.dispatch(fetchHomePageData(endpoint, date))
        return {
            props: {}
        }
    }
)

const mapStateToProps = state => ({
    metaTitle: state.home.content?.metaTitle,
    metaDescription: state.home.content?.metaDescription
})

export default connect(mapStateToProps, null)(HomePage)
