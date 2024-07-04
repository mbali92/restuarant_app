import React from 'react'
import { FoodPlatter } from './model/FoodPlatter';
import { randomBytes } from 'crypto';

type PlatebellRecord = Record<string,FoodPlatter>

interface PlatesContentProps{
    record:PlatebellRecord
}


const Fooditems:React.FC<PlatesContentProps>=({record})=>{
  const plateNames: string[]= Object.keys(record)

  let foodArray:string[][] = [];
  //will store food for each plate
  let singleFoodArray:string[] = [];

  plateNames.map((platevalue,platekey)=>{
    //clear food for each plate first 
    singleFoodArray = [];
    record[platevalue].food.forEach((value)=>
      singleFoodArray.push(value)
    )
    foodArray.push(singleFoodArray)
  }
  )
  return(
     <div className='page-container'>
        <h6 className="section_title">Our food per plate </h6>
        <div className="section_row">
          {
            foodArray.map((plateContainer,plateKey)=>
              <div className='food_card'key={plateKey}>
                 <h1>{plateNames[plateKey]}:</h1>
                <div className="food_content">
                  {
                  plateContainer.map((food,foodkey)=>
                    <p className='food_name' key={foodkey}>{food}</p>)
                  }
                </div>
              </div>
            )
          }
        </div>
     </div>
    );
}

export default Fooditems;