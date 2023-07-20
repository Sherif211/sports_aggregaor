import SubstitutionIcon from '../icons/SubstitutionIcon'

const getShortName = (name) => {
   if (!name) return ''
   const fullName = name.split(' ')
   return `${fullName.shift().charAt(0)}. ${fullName.pop()}`
}

const GoalItem = (incident) => {
   const isHome = incident
   const {player} = incident
   return <>
      <i className='fas fa-futbol text-success'/>
      <time className='px-2 text-muted'>{incident.timeSpecial}&apos;</time>
      <strong>{incident?.result}</strong>
      <span className='small fw-bold px-2' style={{fontSize: '12px'}}>{player?.name}</span>
   </>
}

const CardItem = (incident, cardType = 'yellow') => {
   const {player} = incident
   return <>
      <i className={`cardIcon ${cardType}`}/>
      <time className='px-2 text-muted'>{incident.timeSpecial}&apos;</time>
      <span className='small fw-bold' style={{fontSize: '12px'}}>{player?.name}</span>
   </>
}

const SubstitutionItem = (incident) => {
   const {isHome} = incident
   const {playerIn, playerOut} = incident
   return <>
      <SubstitutionIcon className='svgIcon sm text-info justify-content-end'/>
      <time className='px-2 text-muted'>{incident.timeSpecial}&apos;</time>
      <div className='d-flex' dir={isHome ? 'ltr' : 'rtl'} style={{fontSize: '12px'}}>
         <span className={`fw-bold`}>{getShortName(playerIn?.name)} </span>
         {playerOut?.name &&
         <span className={`text-muted ${isHome ? 'ps-1' : 'pe-1'}`}>Out: {getShortName(playerOut?.name)}</span>}
      </div>
   </>
}

const IncidentItem = ({incident, isFirstItem = false}) => {
   const {isHome} = incident
   let incidentIcon
   switch (incident.incidentType) {
      case 'goal':
         incidentIcon = GoalItem(incident)
         break
      case 'substitution':
         incidentIcon = SubstitutionItem(incident)
         break
      case 'redcard':
         incidentIcon = CardItem(incident, 'red')
         break
      default:
         incidentIcon = CardItem(incident)
         break
   }
   return <div
      className={`d-flex align-items-center ${!isFirstItem && 'border-bottom'} mb-1 ${!isHome ?? 'flex-row-reverse'}`}
      style={{fontSize: '14px'}}
      dir={isHome ? 'ltr' : 'rtl'}>
      {incidentIcon}
   </div>
}

export default IncidentItem