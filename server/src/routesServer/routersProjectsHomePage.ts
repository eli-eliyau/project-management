import { Router } from "express";
import { projectsHomePage,authenticateTheLoginOfAPageUser } from "./functionFoRoutrs/projectsHomePage";

const router = Router();
//מחזיר את כל הפרוקייטים לדף הבית
router.post("/projectsHome", projectsHomePage);

//פונקציה שעושה את האימות של התוקן שקביל היוזר בכניסה למערכת לתוקן שנמצא בדאתא
router.post("/authenticateTheLoginOfAPageUser",authenticateTheLoginOfAPageUser)

export default router;
