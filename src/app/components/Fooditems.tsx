import React,{useEffect,useState} from 'react'
import { FoodProps } from '../types/Projecttypes';


const Fooditems:React.FC<FoodProps>=({record,removeFoodFun})=>{
  const plateNames: string[]= Object.keys(record)
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
    }, 500);
  }, [record]);
      
  return(
     <div className='page-container'>
        <h6 className="section_title">Our food per plate </h6>
        <div className={`section_row ${animate ? 'animate' : ''}`}>
          {
            plateNames.map((plateContainer,plateKey)=>
              <div className='food_card'key={plateKey}>
                 <h1>{plateNames[plateKey]}:</h1>
                <div className="food_content">
                  {
                    record[plateContainer].food.map((food,foodkey)=>
                    <p className='food_name' key={foodkey}>
                      <span>{food}</span>
                      <i onClick={()=>removeFoodFun(plateNames[plateKey],food)}  className="lni lni-close"></i>
                    </p>)
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
