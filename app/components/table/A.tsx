import {Table} from 'react-bootstrap'

const A = ({items}) => {
    return <Table responsive>
        <thead className="custom">
        ...
        </thead>
        <tbody>
        {
            items?.map((item, index) => {
                return <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item?.name}</td>
                </tr>
            })
        }
        </tbody>
    </Table>

}

export default A