import {connect} from 'react-redux'
import {Nav, Navbar} from 'react-bootstrap'
import wildcardValidator from '../../utilites/wildcardValidator'
import {memo} from 'react'
import {useRouter} from 'next/router'
import CustomNextImage from '../image/CustomNextImage'
import {SPORT_NAME} from '../../constants'


const Footer = ({links, sportData}) => {
    const router = useRouter()
    const path = router.pathname
    return <footer>
        <div className="container">
            <div className="row">
                <div className="col-12">
                    {
                        process.env.NEXT_PUBLIC_HIDE_SITES_BAR != 'true' &&
                        <Navbar expand="sm">
                            <Nav className="justify-content-center" style={{width: '100%'}}>
                                {links?.map((item, key) => {
                                    if (item.path == '/' && path != '/')
                                        return <></>
                                    if (item.path != '*' && !wildcardValidator(path, item.path))
                                        return <></>
                                    return <Nav.Link target="_blank" key={key}
                                                     href={`https://${item.link}`}>{item.name} </Nav.Link>
                                })}
                            </Nav>
                        </Navbar>
                    }

                    <div className="text-center">
                        {sportData.footerLogo && <CustomNextImage
                            alt={SPORT_NAME}
                            src={sportData.footerLogo}
                            width={110}
                            height={140}
                        />}
                    </div>

                </div>
            </div>
        </div>
        <hr/>
        <div className="copyright text-center">
            <span>
               Copyrights © {new Date().getFullYear()}
                {}. All
               rights
               reserved.
            </span>
        </div>
    </footer>
}

const mapStateToProps = state => ({
    sportData: state.sport.sportData
})

export default connect(mapStateToProps, null)(memo(Footer))
