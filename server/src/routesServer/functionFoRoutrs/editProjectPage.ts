import {Request,Response} from "express"
import { request } from "http";
import ProjectsPageSchema from "../../schemas/ProjectSchema";
import mongoose from 'mongoose';


//ראוט שמעדכן פרויקט לפי אידי שמקבל שתואם לפרויקט
export const editProjectPage = async(req:Request ,res:Response)=>{
try {
    
    const editProject =await ProjectsPageSchema.updateOne(  { _id: new mongoose.Types.ObjectId(req.body.projectId) }, 
    { [req.body.nameRow]: req.body.value })

    return res.send(editProject)
} catch (error) {
    console.log(error);
}
}