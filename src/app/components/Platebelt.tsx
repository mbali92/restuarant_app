
import React,{useEffect,useState} from 'react'
import { FoodPlatter } from '../model/FoodPlatter';
import { PlateRecord,PlatesContentProps } from '../types/Projecttypes';

//Component to show all the plates in the belt
const Platebelt:React.FC<PlatesContentProps>=({record})=>{
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
    <h6 className="section_title">Our plate belt </h6>
    <div className= {`section_row ${animate ? 'animate' : ''}`}>
      {plateNames.map((value, key) => (
        <p key={key} className='plate-name'><span></span> {value}</p>
      ))}
    </div>
  </div>
);
}

export default Platebelt;