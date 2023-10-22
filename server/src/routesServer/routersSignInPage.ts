import { Router } from "express";
import {
  fo,
  signUpPage,
  authenticationToken,
  signInPage,
} from "./functionFoRoutrs/signInPage";

const router = Router();

//הפונקציה מאמתת את הסיסמא של היוזר בדאתא ואז מקבלת תוקן עבור היוזר ומחזירה אותו לפרונט
router.post("/signUp", signUpPage);
router.post("/signIn", signInPage);

//הראוט מקבל את התוקן מהפרונט ןאז הפונקציה הראושנה מאמתת את התוקן ומחזירה שהיוזר נמצא בדאתא
router.get("/authenticationToken", authenticationToken, fo);
router.get("/authToken", authenticationToken);

export default router;
