import {Request,Response} from "express"
import { request } from "http";
import ProjectsPageSchema from "../../schemas/ProjectSchema";
import mongoose from 'mongoose';


//ראוט שמעדכן פרויקט לפי אידי שמקבל שתואם לפרויקט
export const editProjectPage = async(req:Request ,res:Response)=>{
try {
    
    req.body.nameRow === "projectTeam" && req.body.value.map( (item:Record<string, string> )=> {
        delete item.nameRow;
        return item;
      });

    const editProject =await ProjectsPageSchema.updateOne(  { _id: new mongoose.Types.ObjectId(req.body.id) }, 
    { [req.body.nameRow]: req.body.value })

    return res.send(editProject)
} catch (error) {
    console.log(error);
}
}