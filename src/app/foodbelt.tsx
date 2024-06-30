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



export default function Foodbelt() {

  //belt created from tulp of record type
  type platesRecord = Record<string, FoodPlatter>
  let plateBelt: [platesRecord];
  
  plateBelt = [{"avo": plateTwo}]
  
  //function that adds plates to the best
  function addPlateToBelt(plateName: string, foodPlate: FoodPlatter): void{
    plateBelt = [{...plateBelt[0],[plateName]: foodPlate}]
  }  
  addPlateToBelt("eggDish", plateOne)
   
  //remove oldest plate from the belt
  function removeOldestBelt(): void{
    const beltkeys: string[] = Object.keys(plateBelt[0]);

    if (beltkeys.length != 0) {
      //remove the first element of the keys
      delete plateBelt[0][beltkeys[0]]
    }
  }
  removeOldestBelt()

  //list the number of plates in the belt 
  function totalNumberOfPlate(): number{
    
  }


  

 
  return (
    <>hello i am food belt component</>
  )
}

