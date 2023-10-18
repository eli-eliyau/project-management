import { Request, Response } from "express"
import { request } from "http";
import ProjectsPageSchema from "../../schemas/ProjectSchema";
import mongoose from 'mongoose';
import UsersSchema from "../../schemas/UsersSchema";


//ראוט שמעדכן פרויקט לפי אידי שמקבל שתואם לפרויקט
export const editProjectPage = async (req: Request, res: Response) => {
    try {

        if (req.body.nameRow === "addTeam") {
            req.body.nameRow = 'projectTeam'
            const team = await UsersSchema.find({
                _id: {
                    $in: req.body.value
                }
            }, { name: 1, _id: 1 })

            req.body.value = team
        }

        const editProject = await ProjectsPageSchema.updateOne({ _id: new mongoose.Types.ObjectId(req.body.id) },
            { [req.body.nameRow]: req.body.value })

        return res.send(editProject)
    } catch (error) {
        console.log(error);
    }
}