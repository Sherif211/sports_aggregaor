import {Card as BSCard} from 'react-bootstrap'
import {memo} from 'react'

const Card = ({
                 className = '',
                 id = '',
                 borderless = true,
                 style = null,
                 children,
                 dangerouslySetInnerHTML = null
              }: any) => {
   return <BSCard id={id} className={`${className} ${borderless && 'borderless'}`} style={style}>
      <BSCard.Body dangerouslySetInnerHTML={dangerouslySetInnerHTML}>
         {children}
      </BSCard.Body>
   </BSCard>
}

export default memo(Card)