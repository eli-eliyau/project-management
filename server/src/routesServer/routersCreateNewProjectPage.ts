import { Router } from "express";
import { createNewProjectPage } from "./functionFoRoutrs/createNewProjectPage";


const router=Router()
//ראוט יצירת פרויקט חדש בטבלה
router.post("/createNewProject",createNewProjectPage)

export default router