'use client';

import { setInterval } from "timers/promises";
import { FoodPlatter } from "./model/FoodPlatter";
import { Plate } from "./model/Plate";

//creating type of plates from plates class
let plateOne: FoodPlatter = new FoodPlatter(41, new Set(["bacon", "eggs", "tomato",]), "blue", "square");
let plateTwo: FoodPlatter = new FoodPlatter(41, new Set(["avocado", "bread", "cherry tomatoes", "feta cheese"]), "red", "oval");
let plateThree: FoodPlatter = new FoodPlatter(41, new Set(["chia-seeds", "milk", "honey", "vanilla"]), "orange", "round");
let plateFour: FoodPlatter = new FoodPlatter(41, new Set([]), "blue", "square");
let plateFive: FoodPlatter = new FoodPlatter(41, new Set(["waffle", "banana", "whipped cream"]), "green", "triangle");
let plateSix: FoodPlatter = new FoodPlatter(41, new Set(["bagel", "smoked-salmon", "cream-cheese", "capers"]), "blue","square");

type PlateStats = {
  platesTotal: number,
  uniqueFoodTotal: number
}

export default function Foodbelt() {

  //belt created from tulp of record type
  type platesRecord = Record<string, FoodPlatter>
  let plateBelt: [platesRecord];
  
  plateBelt = [{ "avodish":plateTwo}]
  

  //function that adds plates to the best
  function addPlateToBelt(plateName: string, foodPlate: FoodPlatter): void{
    plateBelt = [{...plateBelt[0],[plateName]: foodPlate}]
  }  
  addPlateToBelt("eggDish", plateOne)

  
  // //remove oldest or random plate from the belt
  async function removeOldPlate(){
    const  beltplatekeys: string[] = Object.keys(plateBelt[0]); 
    if (beltplatekeys.length != 0) {
      //remove element based on index
      delete plateBelt[0][beltplatekeys[0]]
    }
  }
  

  //remove random plate fromthe belt
  async function removeRandomPlate() {
    const  beltplatekeys: string[] = Object.keys(plateBelt[0]); 
    if (beltplatekeys.length != 0){
      const max = beltplatekeys.length - 1;
      const min = 0;
      const randomIndex = Math.floor(Math.random() * (max - min + 1)) + min;
      console.log(randomIndex)
      delete plateBelt[0][beltplatekeys[randomIndex]]
    }
  }
  

  //generate random seconds
  const generateRandomSeconds=():number=>{
    const min:number = 10;
    const max:number = 20;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // //remove random plate at random seconds 
  async function removeDelayedFunction(delayedFunctionParam:()=>Promise<void>,interval:number) {
    
    setInterval(
      async ()=>{
        await delayedFunctionParam();
      }, interval);
  }
  
  async function addRemoveDelayedFunctions(delayedFunctionParam: () => Promise<void>, interval: number):number {
    return setInterval(async () => {
      await delayedFunctionParam();
    }, interval);
  }
 addRemoveDelayedFunctions(removeOldPlate,1000)
  
  
    
  //list the number of plates in the belt 
  function totalNumberOfPlate():void{

    const  remainingBeltkeys: string[] = Object.keys(plateBelt[0]); 

    const uniqueFood: Set<string> = new Set(); 

    //loop through the plates to access unique food, add them to set of unique food
    for (let index = 0; index < remainingBeltkeys.length; index++) {
       
      console.log(plateBelt[0][remainingBeltkeys[index]]['food'])

      // foodOnPlate.forEach((foodType) => {
      //   uniqueFood.add(foodType);
      // })
    }
    // return{
    //   platesTotal: beltplatekeys.length,
    //   uniqueFoodTotal: uniqueFood.size
    // } 
  }

  totalNumberOfPlate()

  //remove plates from platter at random

  
  
  return (
    <>hello i am food belt component</>
  )
}

