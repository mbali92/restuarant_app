
import React from 'react'
import { FoodPlatter } from '../model/FoodPlatter';

type PlatebellRecord = Record<string,FoodPlatter>

interface PlatesContentProps{
    record:PlatebellRecord
}

const Platebelt:React.FC<PlatesContentProps>=({record})=>{
  const plateNames: string[]= Object.keys(record)
  
  
  return(
     <div className='page-container'>
        <h6 className="section_title">Our plate belt </h6>
        <div className="section_row">
          {plateNames.map((value, key) => (
            <p key={key} className='plate-name' ><span></span> {value}</p>
          ))}
        </div>
     </div>
    );
}

export default Platebelt;