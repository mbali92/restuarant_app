import { FoodPlatter } from "../model/FoodPlatter"


type DishType = {
    dishName:string,
    dish:FoodPlatter,
}
type PlateRecord = Record<string,FoodPlatter>
type BeltPlate =[PlateRecord]
type PlateStats = {
    platesTotal: number,
    uniqueFoodTotal: number
}
  
export type {DishType, PlateRecord,PlateStats,BeltPlate}