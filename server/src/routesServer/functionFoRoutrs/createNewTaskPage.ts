import { Request, Response, NextFunction } from "express";
import TaskSchema from "../../schemas/TaskSchema";


export const createNewTaskPage =async(req:Request ,res:Response)=>{
try {
    const newTask = await new TaskSchema(req.body)
    newTask.save()
    return res.send(newTask)
} catch (error) {
    console.log(error);
}
}