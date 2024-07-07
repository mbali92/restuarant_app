
'use client';
import React,{useState,useEffect} from 'react'
import { useTimeout } from 'react-use';
import { BeltPlate, PlateRecord, PlateStats } from '../types/Projecttypes';
import Foodplate from './Foodplate';
import Platebelt from './Platebelt';
import Fooditems from './Fooditems';


function FoodBelt  () {
    const [beltOfPLates, setBelofPlates] = useState<PlateRecord>({});
    const [plateIndex, setplateIndex] = useState<number>(0);
    const [showPage, setShowPage] = useState<string>("belt");
    const [beltStats, setbeltStats] = useState<PlateStats>();
   
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
      const seconds = Math.floor(Math.random() * (max - min + 1)) + min;
     
      const addZeros:string = seconds.toString() + "000";
      const intSeconds:number = parseInt(addZeros);
      return intSeconds;
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
          const updatedBelt:PlateRecord = await response.json(); 
          const updatedBeltCopy = {...updatedBelt };
          setBelofPlates(updatedBeltCopy)
        }
      }catch{
        console.error("object could not be removed")
      }
    } 

    //get number of plates in the belt
    function getPlatesStats():PlateStats{
      const  remainingBeltkeys: string[] = Object.keys(beltOfPLates);
      if(remainingBeltkeys.length){
        const uniqueFood: Set<string> = new Set(); 
        //loop through the plates to access unique food, add them to set of unique food
        for (let index = 0; index < remainingBeltkeys.length; index++) {
          const foodOnPlate:string[] = beltOfPLates[remainingBeltkeys[index]].food;
          foodOnPlate.forEach((foodType) => {
            uniqueFood.add(foodType);
          })
        }
        return{
          platesTotal: remainingBeltkeys.length,
          uniqueFoodTotal: uniqueFood.size
        } 
      }
      return {
        platesTotal: 0,
        uniqueFoodTotal: 0
      }
  } 

    //remove food from plate
    function deleteFood(plateType:string,foodType:string){
      const remainingFoodPlate ={...beltOfPLates}
      remainingFoodPlate[plateType].food.filter(foodItem=>foodItem != foodType);
      setBelofPlates({...remainingFoodPlate})
    }

    //call methods based on certain time 
    useEffect(() => {
        
        setTimeout(addPlates,4000)
        setTimeout(removeRandomPlates,generateRandomSeconds());
        
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
    <div style={{ display: showPage === "plate" ? "block" :"none"}}><Foodplate  record={beltOfPLates} /></div>
    <div style={{ display: showPage === "food" ? "block" :"none"}} ><Fooditems record={beltOfPLates} removeFoodFun={deleteFood}/></div>
    <div className="food_stats">
        <h6>Plate counter:</h6>
        <p>Number of plates in the belt :<span>{getPlatesStats().platesTotal}</span> </p>
        <p>Total number of unique food: <span>{getPlatesStats().uniqueFoodTotal}</span> </p> 
    </div>
    </>   
  )
}
export default FoodBelt;

