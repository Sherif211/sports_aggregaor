import {Badge} from 'react-bootstrap'

const LineupRow = ({item}) => {
   return <tr>
      <td>{item.shirtNumber}</td>
      <td>{item.player.name}</td>
      <td><Badge pill bg='secondary'>{item?.positionName}</Badge></td>
   </tr>
}

export default LineupRow