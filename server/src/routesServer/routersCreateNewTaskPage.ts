import {Router} from 'express'
import { createNewTaskPage } from './functionFoRoutrs/createNewTaskPage'

const router =Router()
//יצירת משימה חדשה בטבלה
router.post("/createNewTask",createNewTaskPage)

export default router