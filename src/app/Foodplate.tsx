import React from 'react'
import { FoodPlatter } from './model/FoodPlatter'

type PlatebellRecord = Record<string,FoodPlatter>

interface PlatesContentProps{
    record:PlatebellRecord
}


const Foodplate:React.FC<PlatesContentProps>=({record})=>{
  const plateNames: string[]= Object.keys(record)

  return(
    <div className="page-container">
       <h6 className="section_title">Our range of plates </h6>
       <div className="section_row">
          {plateNames.map((value, key) => (
            <div className='plate_card'>
              <img key={key} className='plate_images' src={value+".jpg"} alt="" />
              <span>Plate size: {record[value].shape}</span>
            </div>
          ))}
       </div>
    </div>
  )
}

export default Foodplate;