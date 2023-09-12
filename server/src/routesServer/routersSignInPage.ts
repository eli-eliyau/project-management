import { Router } from "express";
import {
  fo,
  signInPage,
  authenticationToken,
} from "./functionFoRoutrs/signInPage";

const router = Router();

//הפונקציה מאמתת את הסיסמא של היוזר בדאתא ואז מקבלת תוקן עבור היוזר ומחזירה אותו לפרונט
router.post("/signInPage", signInPage);

//הראוט מקבל את התוקן מהפרונט ןאז הפונקציה הראושנה מאמתת את התוקן ומחזירה שהיוזר נמצא בדאתא
router.get("/authenticationToken", authenticationToken, fo);

export default router;
