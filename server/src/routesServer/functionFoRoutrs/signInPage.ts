import { Request, Response, NextFunction } from "express";
import UsersSchema, { genToken } from "../../schemas/UsersSchema";
import jwt from "jsonwebtoken";

//הפונקציה מאמתת את הסיסמא של היוזר ויוצרת תוקן ע"י פונקציה
export const signInPage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user =
      (await UsersSchema.findOne({ name: req.body.name })) ||
      (await UsersSchema.findOne({ pass: req.body.pass }));
    if (user) {
      if (user?.name === req.body.name) {
        if (user?.pass === req.body.pass) {
          let newToken = genToken(user?._id);
          //מכניס את התוקן שנשלח ליוזר בכניסה למערכת גם לדאתא כדי לאמת בכל כניסה לדף בפרונט
          await UsersSchema.findOneAndUpdate(
            { _id: user?._id },
            { token: newToken }
          );

          return res.send({ token: newToken });
        } else {
          return res.send("סיסמא אינה נכונה");
        }
      } else {
        return res.send("שם משתמש אינו נכון");
      }
    } else return res.send("משתמש לא קיים במערכת");
  } catch (error) {
    console.log(error);
    return res.status(401).send(false);
  }
};

//פונקציה שעושה אימות לתוקן של יוזר
export const authenticationToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token: any = req.header("x-api-key");
    let userId = jwt.verify(token, "ELI");

    req.body.userId = userId;
  } catch (error) {
    console.log(error);
  }
  next();
};

//לאחר אימות התוקן נקבל מהפונקציה הקודמת את התוקן המתורגם שהוא אידי של היוזר ואז נבקש את פרטי היוזר ונחזיר לפרונט
export const fo = async (req: Request, res: Response) => {
  try {
    let user = await UsersSchema.findOne(
      { _id: req.body.userId },
      { dade_created: 0, pass: 0 }
    );
    console.log(user);

    return res.json(user);
  } catch (err) {
    console.log(err);
  }
};
