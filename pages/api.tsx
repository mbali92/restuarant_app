
import { NextApiRequest,NextApiResponse} from "next";
import { addPlateToBelt, removeOldPlate,removeRandomPlate} from "@/app/services/BeltService";


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
    }
}
