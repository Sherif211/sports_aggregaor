import {memo} from 'react'
import {connect} from 'react-redux'
import Card from '../card/Card'
import TopPlayerItem from './TopPlayerItem'
import {isValidArray} from '../../helpers/utilities'

const TopPlayers = ({topPlayers}) => {
    if (!isValidArray(topPlayers)) return null
    return <Card className="mb-3">
        <strong className="mb-2">Top Players</strong>
        {
            topPlayers.map((item, index) => {
                return <TopPlayerItem key={item.player.id} item={item} index={index}/>
            })
        }
    </Card>

}

const mapStateToProps = state => ({
    topPlayers: state.home.topPlayers
})
export default connect(mapStateToProps, null)(memo(TopPlayers))

