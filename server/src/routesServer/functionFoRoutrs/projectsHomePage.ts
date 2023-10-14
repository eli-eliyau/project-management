import { Request, Response } from "express";
import ProjectSchema from "../../schemas/ProjectSchema";
import UsersSchema from "../../schemas/UsersSchema";
import dayjs from "dayjs";

interface J{
  _id: Object,
   name: string,
   status: string,
   situation: string,
   dateCreated:string,
 
}
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
