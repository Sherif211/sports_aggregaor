import {wrapper} from '../store'
import Layout from '../app/components/layout/Layout'
import {setSportData} from '../redux/actions/sportActions'
import '../app/styles/app.scss'
import variables from '../app/styles/variables.module.scss'
import App from 'next/app'
import {DefaultSeo} from 'next-seo'
import defaultSEO from '../app/seo/next-seo-config'
import ApiInterface from '../app/helpers/ApiInterface'
import {getFooterLinksEndpoint, getHeaderLinksEndpoint} from '../app/helpers/endpoints'
import {setHeaderLinks} from "../redux/actions/homeAction";

const MyApp = ({Component, pageProps, headerLinks, footerLinks}) => {
    return <>
        <style type="text/css">{`
                 :root {
                   --header-background-color: ${!!process.env.NEXT_PUBLIC_HEADER_BACKGROUND_COLOR ? process.env.NEXT_PUBLIC_HEADER_BACKGROUND_COLOR : variables.headerBackgroundColor};
                   --header-text-color: ${!!process.env.NEXT_PUBLIC_HEADER_TEXT_COLOR ? process.env.NEXT_PUBLIC_HEADER_TEXT_COLOR : variables.headerTextColor};
                   --body-background-color: ${!!process.env.NEXT_PUBLIC_BODY_BACKGROUND_COLOR ? process.env.NEXT_PUBLIC_BODY_BACKGROUND_COLOR : variables.bodyBackgroundColor};
                   --body-text-color: ${!!process.env.NEXT_PUBLIC_BODY_TEXT_COLOR ? process.env.NEXT_PUBLIC_BODY_TEXT_COLOR : variables.bodyTextColor};
                   --footer-background-color: ${!!process.env.NEXT_PUBLIC_FOOTER_BACKGROUND_COLOR ? process.env.NEXT_PUBLIC_FOOTER_BACKGROUND_COLOR : variables.footerBackgroundColor};
                   --footer-text-color: ${!!process.env.NEXT_PUBLIC_FOOTER_TEXT_COLOR ? process.env.NEXT_PUBLIC_FOOTER_TEXT_COLOR : variables.footerTextColor};
                   --calendar-btn-bg-color: ${!!process.env.NEXT_PUBLIC_CALENDAR_BUTTON_BG_COLOR ? process.env.NEXT_PUBLIC_CALENDAR_BUTTON_BG_COLOR : variables.calendarButtonBgColor};
                   --calendar-selected-btn-bg-color: ${!!process.env.NEXT_PUBLIC_CALENDAR_SELECTED_BUTTON_BG_COLOR ? process.env.NEXT_PUBLIC_CALENDAR_SELECTED_BUTTON_BG_COLOR : variables.calendarSelectedButtonBgColor};
                   --calendar-btn-text-color: ${!!process.env.NEXT_PUBLIC_CALENDAR_BUTTON_TEXT_COLOR ? process.env.NEXT_PUBLIC_CALENDAR_BUTTON_TEXT_COLOR : variables.calendarButtonTextColor};
                 }
    `}</style>
        <DefaultSeo {...defaultSEO} />
        <Layout footerLinks={footerLinks} headerLinks={headerLinks}>
            <Component  {...pageProps} />
        </Layout>
        <script defer
                src={'https://www.googletagmanager.com/gtag/js?id=' + process.env.NEXT_PUBLIC_GOOGLE_ANALYTIC_ID}/>
        <script defer dangerouslySetInnerHTML={{
            __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTIC_ID}');
`
        }}
        />
    </>
}

// @ts-ignore
MyApp.getInitialProps = wrapper.getInitialAppProps(store => async context => {
    await store.dispatch(setSportData())

    let endpoints = [
        getHeaderLinksEndpoint(),
        getFooterLinksEndpoint()
    ]

    let hLinks = null
    let fLinks = null

    await Promise.all(endpoints.map((endpoint) => ApiInterface.instance.get(endpoint))).then(async ([{data: headerLinks}, {data: footerLinks}]) => {
        hLinks = headerLinks
        fLinks = footerLinks
    })
    store.dispatch(setHeaderLinks(hLinks))

    return {
        headerLinks: hLinks,
        footerLinks: fLinks,
        ...(await App.getInitialProps(context)).pageProps
    }
})

export default wrapper.withRedux(MyApp)