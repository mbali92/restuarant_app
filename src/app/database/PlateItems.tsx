import { FoodPlatter } from '../model/FoodPlatter';
import { DishType} from '../types/Projecttypes';

const plateOne = new FoodPlatter(12, ["toast", "eggs", "tomato", "lettice"], "gray", "round");
const plateTwo = new FoodPlatter(4, ["milk", "cereal"], "red", "round");
const plateThree = new FoodPlatter(16, ["almondnuts", "walnuts", "cheddarcheese", "berries"], "brown", "oval");
const plateFour = new FoodPlatter(4, ["strawberries", "coconut-chunks", "milk", "oats"], "white", "round");
const plateFive = new FoodPlatter(10, ["pancake", "butter"], "white", "round");
const plateSix = new FoodPlatter(12, ["toast", "whip-cream", "strawberries"], "black", "roundSqure");


const plateData: DishType[] = [
  {dishName: "breakfastdish",dish: plateOne},
  {dishName: "cereal",dish: plateTwo},
  {dishName: "cheeseboard",dish: plateThree},
  {dishName: "oatmeal",dish: plateFour},
  {dishName: "pancakes",dish: plateFive},
  {dishName: "toastdish",dish: plateSix}
];

export {plateData};