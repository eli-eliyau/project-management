import { Request, Response, NextFunction } from "express";
import ProjectsPageSchema from "../../schemas/ProjectSchema";
import TaskAdjunctSchema from "../../schemas/TaskAdjunctsSchema";
import TaskSchema from "../../schemas/TaskSchema";
import dayjs from "dayjs";
//מביא את כל הנתונים על הפרויקט
export const projectPage = async (
  req: Request,
  res: Response,
) => {
  try {
    const project = await ProjectsPageSchema.findOne({
      _id: req.body.projectId,
    },{__v:0,dateCreated:0});
    return res.send(project);
  } catch (err) {
    console.log(err);
  }
};
//מביא את כל המשימות הקשורות לאידי של אותו פרויקט
export const taskFoProject = async (
  req: Request,
  res: Response,
) => {
  try {
    const tasks = await TaskSchema.find({ projectId: req.body.projectId },{__v:0});
   
    tasks.sort((a, b) => {
      const dateA = new Date(dayjs(a.endDate).toDate());
      const dateB = new Date(dayjs(b.endDate).toDate());

      if (dateA < dateB) {
        return -1;
      }
      if (dateA > dateB) {
        return 1;
      }

      return 0;
    });
    
    tasks?.forEach((item)=>{
      
      item.startDate=dayjs(item.startDate).format('DD/MM/YYYY')
      item.endDate=dayjs(item.endDate).format('DD/MM/YYYY')
  })


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
