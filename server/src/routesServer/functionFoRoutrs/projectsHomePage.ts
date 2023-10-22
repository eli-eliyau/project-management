import { Request, Response } from "express";
import ProjectSchema, { IProject } from "../../schemas/ProjectSchema";
import UsersSchema from "../../schemas/UsersSchema";
import dayjs, { Dayjs } from "dayjs";
import TaskSchema from "../../schemas/TaskSchema";
import { ObjectId, Types } from "mongoose";

interface ITask {
  _id?: string;
  projectId: string;
  taskDescription: string;
  startDate: Dayjs;
  endDate: Dayjs;
  taskTag: string;
  taskStatus: string;
}



//מחזיר את כל הפרויקטים לדף הבית אבל רק שם סטטוס ומצב
export const projectsHomePage = async (req: Request, res: Response) => {
  try {

    console.log();
    
    let projects = await ProjectSchema.find({
      projectTeam: {
        $elemMatch: { _id: req.body.id }
      }
    }, {
      users: 0,
      topUser: 0,
      projectDescription: 0,
      projectClient: 0,
      __v: 0,
    })


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
    projects = await getNumberCircle(projects)
    projects = projects.map((project: any) => {
      return {
        ...project._doc,
        percentNumber: project.percentNumber
      };
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
      { __v: 0, pass: 0, dade_created: 0 }
    );

    return res.json(userData);
  } catch (err) {
    console.error(err);
  }
};



const getNumberCircle = async (projects: any) => {

  try {

    const getPercentNumber = async (project: any) => {

      const tasks = await TaskSchema.find({ projectId: project._id }, { __v: 0, _id: 0 });
      const percentNumber = calculatePercentNumber(tasks);
      return { ...project, percentNumber };
    }

    const updatedProjects = [];

    for (let i = 0; i < projects.length; i++) {
      const project = projects[i];
      const updatedProject = await getPercentNumber(project);
      updatedProjects.push(updatedProject);
    }

    return updatedProjects;

  } catch (error) {
    console.error(error);
    throw error;
  }

}

const calculatePercentNumber = (tasks: any) => {

  let amountTask: number = 0;
  let counter: number = 0;

  if (tasks?.length) {
    amountTask = tasks.length;
  }

  for (const key in tasks) {
    if (tasks[key].taskStatus === "פעיל") {
      counter++;
    }
  }
  if (counter === 0) return 100;
  else return Math.floor((amountTask - counter) * (100 / amountTask));

}

