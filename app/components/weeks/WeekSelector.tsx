import {useState} from 'react'
import {CALLED_EVENT} from "../../constants"

const WeekSelector = ({weeks,selectedWeek,onChange}) => {

    return <>
        <div>
            <select onChange={onChange} style={{maxWidth:"250px",borderRadius:'50px'}} className="form-control" name="" id="">
                {weeks.map(item=>{
                    return <option
                        selected={selectedWeek && selectedWeek.id == item.id}
                        value={item.id}>{item.name}</option>
                })}
            </select>
        </div>
    </>
}

export default WeekSelector