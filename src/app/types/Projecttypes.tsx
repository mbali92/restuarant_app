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
interface PlatesContentProps{
    record:PlateRecord
}  
interface FoodProps {
    record: PlateRecord;
    removeFoodFun: (plateFood: string, foodType: string) => void;
  }
export type {DishType, PlateRecord,PlateStats,BeltPlate,PlatesContentProps,FoodProps}