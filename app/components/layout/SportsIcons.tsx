import {connect} from 'react-redux'
import {Nav, Navbar} from 'react-bootstrap'
import wildcardValidator from '../../utilites/wildcardValidator'
import {memo} from 'react'
import {useRouter} from 'next/router'
import CustomNextImage from '../image/CustomNextImage'
import {SPORT_NAME} from '../../constants'
// @ts-ignore
Array.prototype.groupBy = function(prop) {
    return this.reduce(function(groups, item) {
        const val = item[prop]
        groups[val] = groups[val] || []
        groups[val].push(item)
        return groups
    }, {})
};

const SportsIcons = (props) => {
    console.log()
    function generateLinks(){
        const groupedLinks = props.links.groupBy('alias');
        let links = [];
        for (let sport in groupedLinks){
            if (sport=="null")
                continue;
            const link = groupedLinks[sport][0]
            links.push(  <li>
                <a target={"_blank"} className="social-tooltip customize-unpreviewable" title={link.name}
                   href={`https://${link.link}`}>
                    <img alt={link.name}
                         src={`/images/types/${sport}.png`}/>
                </a>
            </li>)
        }
        return links;
    }
    return (
        <div className="row">
            <div  className="col-md-12">
                <div className="sidebar pt-2">
                    <ul className="social-links">
                        {generateLinks()}

                    </ul>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    links: state.home.headerLinks
})

export default connect(mapStateToProps, null)(memo(SportsIcons))
