import {Request,Response} from 'express'
import TaskAdjunctSchema from "../../schemas/TaskAdjunctsSchema";



export const createNewAdjunct =async(req:Request,res:Response)=>{
    try {
        const newAdjunct =await new TaskAdjunctSchema(req.body)
        newAdjunct.save()
        return res.send(newAdjunct)
    } catch (error) {
        console.log(error);
    }
}