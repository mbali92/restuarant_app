
import { NextApiRequest,NextApiResponse} from "next";
import { FoodPlatter } from "@/app/model/FoodPlatter";
import { stringify } from "querystring";
import { addPlateToBelt, removeOldPlate,removeRandomPlate,getPlatesStats} from "@/app/services/BeltService";


export default function handler(req: NextApiRequest,res: NextApiResponse) {
    const {method,body,query} = req;
    const {action,id} = query;

    switch(method){
        case 'PUT':
            const addResponse = addPlateToBelt(body,id);
            res.status(200).json(addResponse)
            break;
        case'DELETE':
            if(action == "deleteOld"){
                const removeOldResponse = removeOldPlate(body)
                res.status(200).json(removeOldResponse)
            }else{
               const removeRandomResponse = removeRandomPlate(body)  
               res.status(200).json(removeRandomResponse) 
            }
            break;
        case 'GET':
            const platesStatsResponse = getPlatesStats(body)
            res.status(200).json(platesStatsResponse)
            break;
    }
}
