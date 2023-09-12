import { model, Schema } from "mongoose";

interface IAdjunct {
  taskId: string; //אידי של המשימה שאליה משוייך הניספח וכך נוכל לזמן את כל נספחים ששייכים לאתו אידי
  description: string; //תיאור
  startDate: string; //תאריך התחלה
  endDate: string; //תאריך סיום
}

const taskAdjunctSchema: Schema = new Schema<IAdjunct>({
  taskId: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
});
const TaskAdjunctSchema = model<IAdjunct>("tasks_adjuncts", taskAdjunctSchema);

export default TaskAdjunctSchema;
