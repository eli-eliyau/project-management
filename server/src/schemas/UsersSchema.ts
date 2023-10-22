import mongoose, { Schema, connect } from "mongoose";
import jwt from "jsonwebtoken";
import { run } from "node:test";

// 1. Create an interface representing a document in MongoDB.
export interface IUser {
  projectId:String
  name: string;
  email: string;
  pass: string;
  dade_created: {
    type: Date;
  };
  token: String;
  role: String;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema: Schema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String },
  pass: { type: String, required: true },
  dade_created: {
    type: Date,
    default: Date.now(),
  },
  token: { type: String ,default:'' },
  role: { type: String ,default:"user"},
});

const UsersSchema = mongoose.model<IUser>("users", userSchema);

export const genToken = (userId: Object) => {
  let token = jwt.sign({ _id: userId }, `${process.env.TOKEN}`, { expiresIn: "1mins" });
  return token;
};
export default  UsersSchema;
