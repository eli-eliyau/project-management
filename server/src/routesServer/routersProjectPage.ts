import {Router } from "express";
import {adjunctFoTask, projectPage, taskFoProject}  from "./functionFoRoutrs/projectPage";


const router = Router();

//מחזיר את כל הנתונים לפרוייקט ספציפי לפי אידי לדף הפרויקט
router.post("/projectPage", projectPage);
//מחזיר את כל המשימות לדף הפרוייקט לפי אידי של הפרויקט
router.post("/taskFoProject", taskFoProject);
//מחזיר את כל הנספחים השייכים לאידי של אותה משימה
router.post("/adjunctFoTask",adjunctFoTask)

export default router