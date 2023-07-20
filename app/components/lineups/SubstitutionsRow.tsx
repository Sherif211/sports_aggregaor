import SubstitutionIcon from '../icons/SubstitutionIcon'

const SubstitutionsRow = ({item}) => {
   return <tr>
      <td>
         <span className='pr-3'>
            {item.timeSpecial}&apos; &nbsp;
         </span>
         <span>{item?.playerIn?.name} </span>
         <SubstitutionIcon className='svgIcon sm text-info justify-content-end mx-2'/>
         <span>
            {item?.playerOut?.name}
         </span>
      </td>
   </tr>
}

export default SubstitutionsRow