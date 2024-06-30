'use client';

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

  const  beltplatekeys: string[] = Object.keys(plateBelt[0]);
   
  // //remove oldest plate from the belt
  // function removeOldestBelt(): void{
    
  //   if (beltplatekeys.length != 0) {
  //     //remove the first element of the keys
  //     delete plateBelt[0][beltplatekeys[0]]
  //   }
  // }
  // removeOldestBelt()
 
  //list the number of plates in the belt 
  function totalNumberOfPlate():PlateStats{
  
    const uniqueFood: Set<string> = new Set(); 

    //loop through the plates to access unique food, add them to set of unique food
    for (let index = 0; index <  beltplatekeys.length; index++) {
      const foodOnPlate: Set<string> = plateBelt[0][beltplatekeys[index]].food;

      foodOnPlate.forEach((foodType) => {
        uniqueFood.add(foodType);
      })
    }

    return{
      platesTotal: beltplatekeys.length,
      uniqueFoodTotal: uniqueFood.size
    } 
  }
  console.log(totalNumberOfPlate())
  
  return (
    <>hello i am food belt component</>
  )
}

