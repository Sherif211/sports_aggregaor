import {Nav, Navbar} from 'react-bootstrap'
import {connect} from 'react-redux'
import {memo} from 'react'
import {useRouter, withRouter} from 'next/router'
import {DOMAIN} from '../../constants'
import wildcardValidator from "../../utilites/wildcardValidator";

const Header = ({links, router, content}) => {
    const secondaryMenu = process.env.NEXT_PUBLIC_SECONDARY_MENUBAR?.split(',').map(menuItem => {
        return menuItem.split('|')
    })
    const path = router.pathname
    return <header>
        <Navbar bg="dark" variant="dark" expand="lg">
            <div className="container">
                {process.env.NEXT_PUBLIC_LOGO ? (<>
                    <a href={'/'} title={process.env.NEXT_PUBLIC_NAME}>
                        <img width={300} className={"img-fluid"} src={process.env.NEXT_PUBLIC_LOGO} alt={process.env.NEXT_PUBLIC_NAME}/>
                    </a>
                </>) : (
                    <a style={{
                        textTransform:"uppercase",
                        fontWeight:"bold"
                    }} href="/" className="navbar-brand d-flex align-items-center" >{process.env.NEXT_PUBLIC_NAME}</a>
                )}
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto" defaultActiveKey={DOMAIN}
                         activeKey={DOMAIN}>
                        {
                            secondaryMenu?.map((item) => {
                                return <Nav.Link key={item[0]} href={item[1]} target="_self">
                                 <span className="custom-nav-item">
                                    <span className="content">
                                       <strong>{item[0]}</strong>
                                    </span>
                           </span>
                                </Nav.Link>
                            })
                        }

                        {
                            links?.map((item) => {
                                if (item.alias)
                                    return  <></>
                                if (item.path == '/' && path != '/')
                                    return <></>
                                if (item.path != '*' && !wildcardValidator(path, item.path))
                                    return <></>
                                return <Nav.Link target="_blank" key={item.name} href={`https://${item.link}`}>
                                 <span className="custom-nav-item">
                                    <div className="square-l"/>
                                    <span className="content">
                                       {item.icon && <i className={item.icon}/>}
                                        <strong className="fw-normal">{item.name}</strong>
                                    </span>
                                 <div className="square-r"/>
                           </span>
                                </Nav.Link>
                            })
                        }
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>

    </header>
}

const mapStateToProps = state => ({
    sportData: state.sport.sportData,
    content: state.general.content,
})

export default connect(mapStateToProps, null)(memo(withRouter(Header)))