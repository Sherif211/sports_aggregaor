import {BreadcrumbJsonLd} from 'next-seo'
import {memo} from 'react'

const BreadCrumbSEO = ({paths}) => {
   return <BreadcrumbJsonLd
      itemListElements={
         paths.map((item, index) => {
            return {
               position: index + 1,
               name: item.name,
               item: item.url
            }
         })
      }
   >

   </BreadcrumbJsonLd>
}

export default memo(BreadCrumbSEO)