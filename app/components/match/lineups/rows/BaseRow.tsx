import CustomNextImage from '../../../image/CustomNextImage'
import {secondToMinute} from '../../../../helpers/utilities'

const BaseRow = ({item, homeTeam, awayTeam, cols}) => {
    const doConvert = (convert, value) => {
        if (convert === 'toMinute') {
            return secondToMinute(value)
        } else if (convert === 'oneDecimal') {
            if (value != 0 && value % 1 !== 0) {
                return (+value).toFixed(1)
            }
        }
        return value
    }
    return <tr className="text-center">
        <td className="w-24px px-0">{<CustomNextImage width={20} height={20}
                                                      alt={item.home ? homeTeam.name : awayTeam.name}
                                                      src={item.home ? homeTeam.logo : awayTeam.logo}/>}</td>
        <td className="text-start">{item.player.name}</td>
        {
            cols.map(colItem => {
                if (colItem.key !== 'position') {
                    return <td
                        key={colItem.key}>{colItem.hasOwnProperty('convert') ? doConvert(colItem.convert, item.statistics?.[colItem.key]) : item.statistics?.[colItem.key] ?? 0}</td>
                } else {
                    return <td>{item.position}</td>
                }
            })
        }
    </tr>

}

export default BaseRow