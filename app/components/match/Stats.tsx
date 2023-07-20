import {Table} from 'react-bootstrap'
import Badge from '../common/Badge'
import Card from '../card/Card'

const Stats = ({stats, homeId, awayId}) => {
   if (!stats || stats.length === 0) return null
   const getPrettyKey = (key) => {
      const keys = {
         total: 'Total shots',
         'ongoal': 'Shots on target',
         'offgoal': 'Shots off target',
         'blocked': 'Blocked shots',
         'insidebox': 'Shots in side box',
         'outsidebox': 'Shots out side box',
         'attacks': 'Attacks',
         'dangerous_attacks': 'Dangerous attacks',
         'fouls': 'Fouls',
         'corners': 'Corner kicks',
         'offsides': 'Offsides',
         'possessiontime': 'Possession time',
         'yellowcards': 'Yellow cards',
         'redcards': 'Red cards',
         'saves': 'Saves',
         'substitutions': 'Substitutions',
         'goal_kick': 'Goal kick',
         'goal_attempts': 'Goal attempts',
         'free_kick': 'Free kick',
         'throw_in': 'Throw in',
         'ball_safe': 'Ball safe',
         'goals': 'Goals',
         'penalties': 'Penalties',
         'injuries': 'Injuries'
      }
      return keys[key]
   }

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
   const home = stats[`${homeId}-team`]?.stats
   const away = stats[`${awayId}-team`]?.stats
   const mainKeys = home ? Object.keys(home) : []
   return <Card className='mb-2' borderless={false}>
      <div className='mb-2'><strong>Statistics</strong></div>
      <Table>
         {
            mainKeys.map(mainItem => {
               if (home[mainItem] !== null && typeof home[mainItem] === 'object') {
                  const subMainKeys = Object.keys(home[mainItem])
                  return subMainKeys.map(subItem => {
                     return <tr key={subItem}>
                        <td width='25%' className='text-start'>
                           <Badge
                              className={`${highLightBadge(home[mainItem][subItem], away[mainItem][subItem], 'home')}`}>{home[mainItem][subItem]}</Badge>
                        </td>
                        <td width='50%' className='text-center'><strong>{getPrettyKey(subItem)}</strong></td>
                        <td width='25%' className='text-end'>
                           <Badge
                              className={`${highLightBadge(home[mainItem][subItem], away[mainItem][subItem], 'away')}`}>{away[mainItem][subItem]}</Badge>
                        </td>
                     </tr>
                  })
               } else {
                  if (!home[mainItem] && !away[mainItem]) return null
                  return <tr key={mainItem}>
                     <td width='25%' className='text-start'>
                        <Badge
                           className={`${highLightBadge(home[mainItem], away[mainItem], 'home')}`}>{home[mainItem]}</Badge>
                     </td>
                     <td width='50%' className='text-center'><strong>{getPrettyKey(mainItem)}</strong></td>
                     <td width='25%' className='text-end'>
                        <Badge
                           className={`${highLightBadge(home[mainItem], away[mainItem], 'away')}`}>{away[mainItem]}</Badge>
                     </td>
                  </tr>
               }
            })
         }
      </Table>
   </Card>

}

export default Stats