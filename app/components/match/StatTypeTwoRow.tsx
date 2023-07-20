import Badge from '../common/Badge'

const StatTypeTwoRow = ({item}) => {
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

}

export default StatTypeTwoRow