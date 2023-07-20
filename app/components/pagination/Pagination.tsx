import {Pagination as BootstrapPagination} from 'react-bootstrap'

const Pagination = () => {
   let active = 2
   let items = []
   for (let number = 1; number <= 5; number++) {
      items.push(
         <BootstrapPagination.Item key={number} active={number === active}>
            {number}
         </BootstrapPagination.Item>,
      )
   }

   return <>
      <BootstrapPagination>
         {items}
      </BootstrapPagination>
   </>
}

export default Pagination