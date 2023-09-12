import { Request, Response, NextFunction } from "express";
import TaskSchema from "../../schemas/TaskSchema";

//מעדכן את נתוני המשימה בטבלה לפי אידי של אותה משימה
export const editTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const changeValueTask = await TaskSchema.updateOne(
      { _id: req.body._id },
      req.body
    );
    return res.send(changeValueTask);
  } catch (error) {
    console.log(error);
  }
};
