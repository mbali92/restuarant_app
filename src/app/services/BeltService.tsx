import { useState } from "react";
import { plateData } from "../database/PlateItems";
import { DishType,PlateRecord, PlateStats} from "../types/Projecttypes";

//add plates on the belt 
function addPlateToBelt(plates:PlateRecord,plateIndex:any):PlateRecord{    
    const updatePlateBelt = {...plates,[plateData[plateIndex]['dishName']]:plateData[plateIndex].dish}
    return updatePlateBelt;
}

//remove oldest
function removeOldPlate(remainingPlates:PlateRecord):PlateRecord{
    const remainingBeltkeys: string[] = Object.keys(remainingPlates); 
    const remaingPlate:PlateRecord = {...remainingPlates};

    if (remainingBeltkeys.length) {
      //remove element based on index
      delete remaingPlate[remainingBeltkeys[0]]
    }
    return remaingPlate;
}

//remove random plate
function removeRandomPlate(remainingDishes:PlateRecord):PlateRecord{
    const remainingBeltkeys: string[] = Object.keys(remainingDishes);  
    const remainingPlatesChanged:PlateRecord ={...remainingDishes};

    if (remainingBeltkeys.length){
      const max = remainingBeltkeys.length - 1;
      const min = 0;
      const randomIndex = Math.floor(Math.random() * (max - min + 1)) + min;
      delete remainingPlatesChanged[remainingBeltkeys[randomIndex]]
    }
    return remainingPlatesChanged;
}
  
//list the number of plates in the belt 
function getPlatesStats(beltPlates:PlateRecord):PlateStats{
    const  remainingBeltkeys: string[] = Object.keys(beltPlates);

    if(remainingBeltkeys.length){
      const uniqueFood: Set<string> = new Set(); 
      //loop through the plates to access unique food, add them to set of unique food
      for (let index = 0; index < remainingBeltkeys.length; index++) {
        const foodOnPlate:string[] = beltPlates[remainingBeltkeys[index]].food;
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
export{addPlateToBelt, removeOldPlate, removeRandomPlate, getPlatesStats} 
