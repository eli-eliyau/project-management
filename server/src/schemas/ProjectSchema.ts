import mongoose, { Schema } from "mongoose";
//סכמה של הפרוייקט בדף הפרוייקט עצמו כאן חלק מהנתונים רק וצריך ליבא מעוד טבלאות

export interface IProject {
  _id:string
  name: string;
  status:string
  situation: string;
  users: string;
  topUser: string;
  projectDescription: string;
  projectTeam: string[];
  projectClient:string
  percentNumber :number |undefined
  dateCreated: {
    type: string,
  },
}

const projectSchema: Schema = new Schema({
  name: { type: String, required: true },
  status: { type: String ,default:"פעיל"}, //סטטוס
  situation: { type: String }, //מצב תחזוקה
  users: { type: String }, //האם יש משתמשים
  topUser: { type: String }, //משתמש מוביל
  projectDescription: { type: String, required: true }, //תיאור הפרוקייט
  projectTeam: { type:[{id: String, name: String}], required: true }, //צוות הפרוייקט
  dateCreated: {
    type: Date,default:new Date
  },
});

const ProjectSchema = mongoose.model<IProject>(
  "projects-pages",
  projectSchema
);
export default ProjectSchema;
