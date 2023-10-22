import { Request, Response, NextFunction } from "express";
import UsersSchema, { genToken } from "../../schemas/UsersSchema";
import jwt from "jsonwebtoken";

//הפונקציה מאמתת את הסיסמא של היוזר ויוצרת תוקן ע"י פונקציה
export const signInPage = async (req: Request, res: Response) => {
  try {
    const user = await UsersSchema.findOne({
      $and: [{ email: req.body.email }, { pass: req.body.pass }]
    });

    if (user === null) {

      return res.send("משתמש לא קיים");
    }

    const isValid = user.email === req.body.email && user.pass === req.body.pass;

    if (!isValid) {
      return res.send("שם משתמש או סיסמה שגויים");
    }

    const token = genToken(user);

    await UsersSchema.findOneAndUpdate(
      { _id: user._id },
      { $set: { token: token } }
    );
    res.send({ user, token });

  } catch (error) {
    console.error(error);
    res.status(401).send(false);
  }
}


export const signUpPage = async (req: Request, res: Response) => {
  try {
    let user = await UsersSchema.findOne({
      $or: [{ name: req.body.name }, { pass: req.body.email }]
    });

    if (user) {
      console.log("משתמש קיים במערכת");

      return res.send("משתמש קיים במערכת");
    }
    else {
      user = await new UsersSchema(req.body);
      await user.save();
      let token = genToken(user);
      res.cookie("token", `${token}`);

      await UsersSchema.findOneAndUpdate(
        { _id: user._id },
        { $set: { token: token } }
      );

      user.pass = '****'
      console.log(req.cookies['token']);
      
     return res.send({ user, token });
    }
  } catch (error) {
    console.error(error);
    res.status(401).send(false);
  }
}

//פונקציה שעושה אימות לתוקן של יוזרתראה לי
export const authenticationToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token: any = req.header("x-api-key");
    let user = jwt.verify(token, `${process.env.TOKEN}`);
    user && res.send(true)
    // req.body.user = user;
  } catch (error) {
    console.log(error);
  }
  // next();
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


export const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // let token: any = req.header("x-api-key");
    const token = req.cookies.token;
    let userId = jwt.verify(token, `${process.env.TOKEN}`);

    req.body.userId = userId;
  } catch (error) {
    console.log(error);
  }
  next();
};