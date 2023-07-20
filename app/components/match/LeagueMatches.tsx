import MatchItem from './MatchItem'

const LeagueMatches = ({league}) => {
   const {events} = league
   return <>
      <span className='pb-3'>Premier League</span>
      <div className='team--league'>
         {
            events.map(item => {
               return <MatchItem key={item.homeTeam?.id ?? item?.title} item={item}/>
            })
         }
      </div>

   </>
}

export default LeagueMatches