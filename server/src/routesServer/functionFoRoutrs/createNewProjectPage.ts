import ProjectSchema from "../../schemas/ProjectSchema";
import { Request, Response } from 'express'
import UsersSchema from "../../schemas/UsersSchema";


export const createNewProjectPage = async (req: Request, res: Response) => {
  try {


    const team = await UsersSchema.find({
      _id: {
        $in: req.body.projectTeam
      }
    }, { name: 1, _id: 1 })

    req.body.newProject.projectTeam
      = team

    const newProject = new ProjectSchema(req.body.newProject)
    await newProject.save()

    return res.send(newProject)
  } catch (error) {
    console.log(error);
  }
}