import { Request, Response, NextFunction } from "express";
import ProjectsPageSchema from "../../schemas/ProjectSchema";
import TaskAdjunctSchema from "../../schemas/TaskAdjunctsSchema";
import TaskSchema from "../../schemas/TaskSchema";
//מביא את כל הנתונים על הפרויקט
export const projectPage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const project = await ProjectsPageSchema.findOne({
      _id: req.body.projectId,
    });
    return res.send(project);
  } catch (err) {
    console.log(err);
  }
};
//מביא את כל המשימות הקשורות לאידי של אותו פרויקט
export const taskFoProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tasks = await TaskSchema.find({ projectId: req.body.projectId },{__v:0});
    return res.send(tasks);
  } catch (error) {
    console.log(error);
  }
};


export const adjunctFoTask= async( req: Request,
    res: Response,
    )=>{
        try {
            const adjunct=await TaskAdjunctSchema.find({taskId:req.body.taskId},{__v:0})
            return res.send(adjunct)
        } catch (error) {
            console.log(error);
        }
    }
