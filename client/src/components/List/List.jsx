import React from 'react'
import './List.scss'
import {listData} from "../../lib/dummyData";
import Card from "../../components/Card/Card.jsx";
const List = () => {
  return (
    <div className='list'>
        {listData.map(item=>(
            <Card key={item.id} item={item}/>
        ))}
    </div>
  )
}

export default List