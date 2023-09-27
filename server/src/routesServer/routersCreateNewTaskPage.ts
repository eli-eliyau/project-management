import {Router} from 'express'
import { createNewTaskPage, deleteTask } from './functionFoRoutrs/createNewTaskPage'

const router =Router()
//יצירת משימה חדשה בטבלה
router.post("/createNewTask",createNewTaskPage)
router.post("/deleteTask",deleteTask)

export default router