import {Request,Response} from "express"
import { request } from "http";
import ProjectsPageSchema from "../../schemas/ProjectSchema";
//ראוט שמעדכן פרויקט לפי אידי שמקבל שתואם לפרויקט
export const editProjectPage = async(req:Request ,res:Response)=>{
try {
    const editProject =await ProjectsPageSchema.updateOne({_id:req.body.projectId},req.body.DataAditProject)
    return res.send(editProject)
} catch (error) {
    console.log(error);
}
}