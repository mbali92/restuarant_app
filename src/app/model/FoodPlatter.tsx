import { Plate } from "./Plate";

export class FoodPlatter extends Plate{
    constructor(size:number, food:Array<string>, colour:string,public shape: string) {
        super(size, food, colour)
    }
}