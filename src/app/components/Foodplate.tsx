import React,{useEffect,useState} from 'react'
import { FoodPlatter } from '../model/FoodPlatter'
import { PlateRecord } from '../types/Projecttypes'
import { PlatesContentProps } from '../types/Projecttypes'

const Foodplate:React.FC<PlatesContentProps>=({record})=>{
  const plateNames: string[]= Object.keys(record)
  const [animate, setAnimate] = useState(false);

useEffect(() => {
  setAnimate(true);
  setTimeout(() => {
    setAnimate(false);
  }, 500);
}, [record]);

  return(
    <div className="page-container">
       <h6 className="section_title">Our range of plates </h6>
       <div className={`section_row ${animate ? 'animate' : ''}`}>
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