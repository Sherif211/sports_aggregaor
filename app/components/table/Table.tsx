import {Table as BootstrapTable} from 'react-bootstrap'
import {memo} from 'react'
import NoDataToDisplay from '../common/NoDataToDisplay'
import {isValidArray} from '../../helpers/utilities'


const Table = ({head = null, bodyData = [], RowComponent, additionalData = null, className = ''}) => {
    return <>
        <BootstrapTable className={className} hover striped responsive>
            <thead className="custom">
            {head}
            </thead>
            {
                isValidArray(bodyData) ?
                    <tbody>
                    {
                        bodyData?.map((item, index) => <RowComponent key={index} item={item}
                                                                     additionalData={additionalData}/>)
                    }
                    </tbody> : <caption><NoDataToDisplay/></caption>
            }
        </BootstrapTable>
    </>
}

export default memo(Table)