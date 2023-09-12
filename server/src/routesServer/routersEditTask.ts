import {Router } from "express";
import { editTask } from "./functionFoRoutrs/editTaskPage";


const router = Router();

//מעדכן את נתוני המשימה בטבלה של המשימות לפי אידי של המשימה
router.put("/editTask",editTask);

export default router