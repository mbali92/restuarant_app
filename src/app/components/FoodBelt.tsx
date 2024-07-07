
'use client';
import React,{useState,useEffect,createContext} from 'react'
import { useTimeout } from 'react-use';
import { BeltPlate, PlateRecord } from '../types/Projecttypes';
import { plateData } from '../database/PlateItems';
import { FoodPlatter } from '../model/FoodPlatter';
import Platebelt from './Platebelt';


function FoodBelt  () {
    const [beltOfPLates, setBelofPlates] = useState<PlateRecord>({});
    const [plateIndex, setplateIndex] = useState<number>(0);
    const [showPage, setShowPage] = useState<string>("belt");
   
    //call add function api
    async function addPlates() {
      try {
        const nextIndex = plateIndex + 1;
        const response = await fetch(`http://localhost:3000/api?id=${plateIndex}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(beltOfPLates)
        })
        if (response.ok) {
          const updatedBelt = await response.json();
          const updatedBeltCopy = {...updatedBelt };
          setBelofPlates(updatedBeltCopy)
          if (nextIndex > 5) {
            setplateIndex(0);
          } else {
            setplateIndex(nextIndex);
          }
        }
      } catch {
        console.error("object could not be added")
      }
    } 

    //generate random seconds
    const generateRandomSeconds=():number=>{
      const min:number = 10;
      const max:number = 20;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  
    //call remove old plate api function
    async function removeOldPlates() {
      try{
        const response = await fetch(
          `http://localhost:3000/api?action=deleteOld`,{
            method:'DELETE',
            headers:{
            'Content-Type': 'application/json'
            },
            body:JSON.stringify(beltOfPLates)
          }
        )
        if(response.ok){
            const updatedBelt:PlateRecord = await response.json(); 
            const updatedBeltCopy = { ...updatedBelt };
            setBelofPlates(updatedBeltCopy)
        }
      }catch{
        console.error("object could not be removed")
      }
    }
    
    //call remove random plate api function
    async function removeRandomPlates() {
      try{
        const response = await fetch(
          `http://localhost:3000/api`,{
            method:'DELETE',
            headers:{
            'Content-Type': 'application/json'
            },
            body:JSON.stringify(beltOfPLates[0])
          }
        )
        if(response.ok){
            const updatedBelt:PlateRecord = JSON.parse(await response.json()); 
          
        }
      }catch{
        console.error("object could not be removed")
      }
    } 
    // function deleteFood(plateType:string,foodType:string){
    //   const remainingFoodPlate ={...beltOfPLates[0]}
    //   remainingFoodPlate[plateType].food.filter(foodItem=>foodItem != foodType);
    //   setBelofPlates([remainingFoodPlate])
    // }
    useEffect(() => {
        setTimeout(addPlates,4000)
        setTimeout(removeOldPlates,10000)
        return () => {
        }
      }, [beltOfPLates]);

  return (
    <>
    <div className="home-title">
      <h1>Foodies Restuarant </h1>
      <p>Where the love of food lives </p>
      </div>
    <div className="navbar">
      <p className="" onClick={()=>setShowPage("belt")} >Food belt</p>
      <p className="" onClick={()=>setShowPage("plate")} >Food Plates</p>
      <p className="" onClick={()=>setShowPage("food")} >Food Items</p>
      <span id='nav_link_bg'></span>
    </div>
    <div style={{ display: showPage === "belt" ? "block" :"none"}}><Platebelt  record={beltOfPLates}/></div>
    {/* <div style={{ display: showPage === "plate" ? "block" :"none"}}><Foodplate  record={platesContent}/></div> */}
    {/* <div style={{ display: showPage === "food" ? "block" :"none"}} ><Fooditems record={platesContent} removeFoodFun={deleteFood}/></div> */}
    <div className="food_stats">
        <h6>Plate counter:</h6>
        <p>Number of plates in the belt :<span> </span> </p>
        <p>Total number of unique food: <span></span> </p> 
    </div>
    </>   
  )
}
export default FoodBelt;

