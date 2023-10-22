// import { Request, Response, NextFunction } from "express";
// import UsersSchema from "../../schemas/UsersSchema";

// // פונקציה שמקבל פרטים על יוזר חדש ומכניסה אותו לדאטא
// export const signUpPage = async (req: Request, res: Response) => {
//   try {
//     const userName = await UsersSchema.findOne({ name: req.body.name });
//     if (userName) {
//       return res.send("משתמש קיים במערכת");
//     } else {
//       const user = await new UsersSchema(req.body);
//       user.save();
//       return res.send(user);
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(401).send(false);
//   }
// };
