import mongoose, { Schema } from "mongoose";
//סכמה של הפרוייקט בדף הפרוייקט עצמו כאן חלק מהנתונים רק וצריך ליבא מעוד טבלאות

export interface IProject {
  name: string;
  status:string
  situation: string;
  users: string;
  topUser: string;
  projectDescription: string;
  projectTeam: string;
  projectClient:string
  dadeCreated: {
    type: Date,
  },
}

const projectSchema: Schema = new Schema<IProject>({
  name: { type: String, required: true },
  status: { type: String ,default:"פועל"}, //סטטוס
  situation: { type: String }, //מצב תחזוקה
  users: { type: String }, //האם יש משתמשים
  topUser: { type: String }, //משתמש מוביל
  projectDescription: { type: String, required: true }, //תיאור הפרוקייט
  projectTeam: { type: String, required: true }, //צוות הפרוייקט
  projectClient: { type: String, required: true },//לקוח הפרוייקט
  dadeCreated: {
    type: Date,
  },
});
const ProjectSchema = mongoose.model<IProject>(
  "projects-pages",
  projectSchema
);
export default ProjectSchema;
