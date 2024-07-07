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

export{addPlateToBelt, removeOldPlate, removeRandomPlate} 
