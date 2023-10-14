import { Request, Response, NextFunction } from "express";
import UsersSchema from "../../schemas/UsersSchema";

const LoggedOff = async (req: Request, res: Response) => {
  try {
    const userLoggedOff = await UsersSchema.findOneAndUpdate(
      { name: req.body.name },
      { token: null }
    );
    res.send(userLoggedOff);
  } catch (err) {
    console.log(err);
  }
};

const getAllUsers = async (req: Request, res: Response) => {

  try {
    const users = await UsersSchema.find({}, {
      __v: 0,
       token: 0,
      pass: 0,
      dade_created: 0,
      role:0

    })

    res.send(users)
  } catch (error) {
    console.log(error);
  }
}
export { LoggedOff, getAllUsers };
