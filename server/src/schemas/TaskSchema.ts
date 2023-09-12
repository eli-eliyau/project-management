import { Dayjs } from "dayjs";
import mongoose, { Schema } from "mongoose";
//בטבלה הזאת היו כל המשימות החדשות שנוצרו
export interface ITask {
  projectId: string; //מקבל את אידי של פרויקט וכך נדע שהמשימה זאת שייך לאותו פרויקט
  taskDescription: string; //תיאור המשימה
  startDate: string; //תאריך התחלה
  endDate: string; //תאריך סיום
  taskTag: string; //תג משימה
  taskStatus: string; //סטטוס משימה פעיל או לא
}

const taskSchema: Schema = new Schema<ITask>({
  projectId: { type: String, required: true },
  taskDescription: { type: String, required: true },
  startDate: { type: String , required: true },
  endDate: { type: String, required: true },
  taskTag: { type: String, default: null},
  taskStatus: { type: String, default: "פעיל" },
});
const TaskSchema = mongoose.model<ITask>("creates-tasks", taskSchema);
export default TaskSchema;
