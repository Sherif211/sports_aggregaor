import Card from '../card/Card'
import {Table} from 'react-bootstrap'
import Badge from '../common/Badge'
import {connect} from 'react-redux'
import {memo} from 'react'

const highLightBadge = (home, away, sender) => {
    if (home > away) {
        if (sender === 'home') {
            return 'bgHighlightHome'
        }
    } else if (home < away) {
        if (sender === 'away') {
            return 'bgHighlightAway'
        }
    }
    return ''
}

const StatsTypeTwo = ({stats}) => {
    if (!stats || stats.length === 0) return null
    return <Card className="mb-2" borderless={false}>
        <div className="mb-2"><strong>Statistics</strong></div>
        <Table responsive>
            <tbody>
            {
                stats?.[0]?.groups?.map(mainItem => {
                    return mainItem?.statisticsItems?.map(item => {
                        return <tr key={item.name}>
                            <td className="text-start">
                                <Badge
                                    className={`${highLightBadge(item.home, item.away, 'home')} cutterText`}>{item.home}</Badge>
                            </td>
                            <td className="text-center"><strong className="cutterText">{item.name}</strong></td>
                            <td className="text-end">
                                <Badge
                                    className={`${highLightBadge(item.home, item.away, 'away')} cutterText`}>{item.away}</Badge>
                            </td>
                        </tr>
                    })
                })
            }
            </tbody>
        </Table>
    </Card>
}
const mapStateToProps = state => ({
    stats: state.event.stats
})
export default connect(mapStateToProps, null)(memo(StatsTypeTwo))
