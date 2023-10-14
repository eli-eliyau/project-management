import ProjectSchema from "../../schemas/ProjectSchema";
import { Request, Response } from 'express'


export const createNewProjectPage = async (req: Request, res: Response) => {
    try {
        req.body.newProject.projectUsers= req.body.projectTeam;
        console.log(req.body);
        //צריך לקחת את השמות של איוזרים לפי אידי שלהם ולכניס אותם לצוות הפרויקט
        const newProject = new ProjectSchema(req.body.newProject)
        await newProject.save()
        return res.send(newProject)
    } catch (error) {
        console.log(error);
    }
}