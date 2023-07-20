import Table from './Table'
import Card from '../card/Card'

const CardTable = (props) => {

   return <Card className={props.className}>
      {props.topRender}
      <Table {...props} />
   </Card>

}

export default CardTable