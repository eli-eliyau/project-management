import ProjectSchema from "../../schemas/ProjectSchema";
import {Request,Response} from 'express'


export const createNewProjectPage=async(req:Request,res:Response)=>{
try {
    const newProject =new ProjectSchema(req.body.DataNewProject)
    newProject.save()
    return res.send(newProject)
} catch (error) {
    console.log(error);
}
}