import Header from './Header'
import {useRouter} from 'next/router'
import {memo, useEffect, useState} from 'react'
import Footer from './Footer'


const Layout = ({children, footerLinks, headerLinks}: any) => {
    const [showButton, setShowButton] = useState(false)
    const router = useRouter()

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 320) {
                setShowButton(true)
            } else {
                setShowButton(false)
            }
        })
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // for smoothly scrolling
        })
    }
    return <>
        <div id="search-overlay"/>
        <Header links={headerLinks}/>
        <div className="main">
            <div
                className={router.pathname.includes(process.env.NEXT_PUBLIC_GENERAL_GAME_PAGE_SLUG + '/') || router.pathname.includes(process.env.NEXT_PUBLIC_EVENT_PREFIX + '/') || router.pathname.includes(process.env.NEXT_PUBLIC_TITLE_EVENT_PREFIX + '/') ? 'noGutter' : 'container'}>
                <div id="layout" className="row">
                    <div id="content" className="col-md-12">
                        {children}
                    </div>
                </div>
            </div>
        </div>
        {showButton && (
            <button onClick={scrollToTop} className="back-to-top flex justify-content-center align-items-center">
                &#8682;
            </button>
        )}
        <br/>
        <Footer links={footerLinks}/>
    </>
}


export default memo(Layout)
