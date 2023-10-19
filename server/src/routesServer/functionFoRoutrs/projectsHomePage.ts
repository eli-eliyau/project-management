import { Request, Response } from "express";
import ProjectSchema from "../../schemas/ProjectSchema";
import UsersSchema from "../../schemas/UsersSchema";
import dayjs, { Dayjs } from "dayjs";
import TaskSchema from "../../schemas/TaskSchema";
import { ObjectId } from "mongoose";

interface ITask {
  _id: ObjectId;
  projectId: string;
  taskDescription: string;
  startDate: Dayjs;
  endDate: Dayjs;
  taskTag: string;
  taskStatus: string;
}

// interface Ids extends Array<Record<string, string>> { }

//מחזיר את כל הפרויקטים לדף הבית אבל רק שם סטטוס ומצב
export const projectsHomePage = async (req: Request, res: Response) => {
  try {
    const projects = await ProjectSchema.find(
      {},
      {
        users: 0,
        topUser: 0,
        projectDescription: 0,
        projectTeam: 0,
        projectClient: 0,
        __v: 0,
      }
    );

    projects.sort((a, b) => {

      const dateA = dayjs(a.dateCreated.type);
      const dateB = dayjs(b.dateCreated.type);
    
      if (dateA.isBefore(dateB)) {
        return -1;
      }
    
      if (dateA.isAfter(dateB)) {
        return 1;
      }
    
      return 0;
    
    });
   

    const projectsId = projects.map(obj => (obj.id))
    console.log(
    getNumberCircle(projectsId)

    );
    
  
    return res.send(projects);
  } catch (err) {
    console.log(err);
  }
};


//פונקציה שעושה את האימות של התוקן שקביל היוזר בכניסה למערכת לתוקן שנמצא בדאתא
export const authenticateTheLoginOfAPageUser = async (
  req: Request,
  res: Response
) => {
  try {
    let userData = await UsersSchema.findOne(
      { token: req.body.token },
      { __v:0,pass: 0, dade_created: 0 }
    );

    return res.json(userData);
  } catch (err) {
    console.error(err);
  }
};



const getNumberCircle =(ids:string[]) =>{

   ids.map(async(item)=>{
    const task = await TaskSchema.find({projectId : item},{__v:0})
    const num = numberPercent(task)
    console.log(num);

  })

}

const numberPercent = (tasks: any) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task:any )=> task.taskStatus === 'לא פעיל').length;

  const completedTasksPercentage = (completedTasks / totalTasks) * 100;

  return completedTasksPercentage;
};