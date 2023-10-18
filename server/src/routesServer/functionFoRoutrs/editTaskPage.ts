import { Request, Response, NextFunction } from "express";
import TaskSchema from "../../schemas/TaskSchema";
import mongoose from "mongoose";

//מעדכן את נתוני המשימה בטבלה לפי אידי של אותה משימה
export const editTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);

    const changeValueTask = await TaskSchema.updateOne({ _id: new mongoose.Types.ObjectId(req.body.id) },
      { [req.body.nameRow]: req.body.value })

    return res.send(changeValueTask);
  } catch (error) {
    console.log(error);
  }
};
