'use client';
import React,{useState,useEffect} from 'react'
import { FoodPlatter } from "./model/FoodPlatter";
import Fooditems from "./Fooditems";
import Platebelt from "./Platebelt";
import Foodplate from "./Foodplate";
import Link from 'next/link';
import { title } from "process";



//creating type of plates from plates class
let plateOne: FoodPlatter = new FoodPlatter(12, new Set(["toast", "eggs", "tomato","lettice"]), "gray", "round");
let plateTwo: FoodPlatter = new FoodPlatter(4, new Set(["milk", "cereal"]), "red", "round");
let plateThree: FoodPlatter = new FoodPlatter(16, new Set(["almondnuts", "walnuts", "cheddarcheese", "berries"]), "brown", "oval");
let plateFour: FoodPlatter = new FoodPlatter(4, new Set(["strawberries", "coconut-chunks", "milk", "oats"]), "white", "round");
let plateFive: FoodPlatter = new FoodPlatter(10, new Set(["pancake", "butter"]), "white", "round");
let plateSix: FoodPlatter = new FoodPlatter(12, new Set(["toast", "whip-cream", "strawberries"]), "black", "roundSqure");


type PlateStats = {
  platesTotal: number,
  uniqueFoodTotal: number
}

type DishType ={
  dishName:string,
  dish:FoodPlatter;
}

export default function Foodbelt() {
  type platesRecord = Record<string, FoodPlatter>
  type PlateBelt =[platesRecord]

  const [beltOfPLates, setbeltOfPLates] = useState<PlateBelt>([{}]);
  const [plateIndex, setplateIndex] = useState<number>(0);
  const [showPage, setShowPage] = useState<string>("belt");

  const listOfPlates:DishType[] = [{dishName:"breakfastdish",dish:plateOne},{dishName:"cereal",dish:plateTwo},{dishName:"cheeseboard",
    dish:plateThree},{dishName:"oatmeal",dish:plateFour},{dishName:"pancakes",dish:plateFive},{dishName:"toastdish",dish:plateSix}];
    

    //add plate to belt
    function addPlateToBelt():void{
      let plateIndexCopy:number = plateIndex;
      if (plateIndexCopy === listOfPlates.length) {
        plateIndexCopy = 0;
        setplateIndex(1); // assign 1 so index it moved to the second value
      } else {
        setplateIndex(preIndex => (preIndex + 1)); 
      }
    
      const updatePlateBelt = {...beltOfPLates[0],[listOfPlates[plateIndexCopy]['dishName']]:listOfPlates[plateIndexCopy].dish}
      setbeltOfPLates([updatePlateBelt])
      } 

      // //remove oldest or random plate from the belt
      function removeOldPlate(){
        const remainingBeltkeys: string[] = Object.keys(beltOfPLates[0]); 
        if (remainingBeltkeys.length) {
          //remove element based on index
          const remaingPlate = beltOfPLates[0];
          delete remaingPlate[remainingBeltkeys[0]]
          setbeltOfPLates([remaingPlate])
        }
      }
       
  //remove random plate fromthe belt
  async function removeRandomPlate() {
    const remainingBeltkeys: string[] = Object.keys(beltOfPLates[0]);  
    if (remainingBeltkeys.length){
      const max = remainingBeltkeys.length - 1;
      const min = 0;
      const randomIndex = Math.floor(Math.random() * (max - min + 1)) + min;
      const remainingPlates = beltOfPLates[0];
      delete remainingPlates[remainingBeltkeys[randomIndex]]
      setbeltOfPLates([remainingPlates])
    }
  }
  
  // //generate random seconds
  const generateRandomSeconds=():number=>{
    const min:number = 10;
    const max:number = 20;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
    
  
  useEffect(() => {
    let removePlateInteravl = setInterval(removeOldPlate, 10000);
    let addItemInterval = setInterval(addPlateToBelt, 4000);
    return () => {
      if(removePlateInteravl){
        clearInterval(removePlateInteravl);
        clearInterval(addItemInterval)
      }  
    }

  }, [plateIndex,beltOfPLates]);


  // //list the number of plates in the belt 
  function totalNumberOfPlates():PlateStats{
    const  remainingBeltkeys: string[] = Object.keys(beltOfPLates[0]);
    if(remainingBeltkeys.length){
      const uniqueFood: Set<string> = new Set(); 

      //loop through the plates to access unique food, add them to set of unique food
      for (let index = 0; index < remainingBeltkeys.length; index++) {
        const foodOnPlate:Set<string> = beltOfPLates[0][remainingBeltkeys[index]]['food'];
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
  const plateNumbers:PlateStats = totalNumberOfPlates();

  function deleteFood(plateType:string,foodType:string){
    const remainingFoodPlate ={...beltOfPLates[0]}
    remainingFoodPlate[plateType].food.delete(foodType);
    setbeltOfPLates([remainingFoodPlate])
  }

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
    <div style={{ display: showPage === "belt" ? "block" :"none"}}><Platebelt  record={beltOfPLates[0]}/></div>
    <div style={{ display: showPage === "plate" ? "block" :"none"}}><Foodplate  record={beltOfPLates[0]}/></div>
    <div style={{ display: showPage === "food" ? "block" :"none"}} ><Fooditems record={beltOfPLates[0]} removeFoodFun={deleteFood}/></div>
    <div className="food_stats">
        <h6>Plate counter:</h6>
        <p>Number of plates in the belt :<span> {plateNumbers.platesTotal}</span> </p>
        <p>Total number of unique food: <span>{plateNumbers.uniqueFoodTotal}</span> </p> 
    </div>
   
    </>
  )
}

