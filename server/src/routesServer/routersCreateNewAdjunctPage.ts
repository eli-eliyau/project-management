import { Router } from "express"
import {createNewAdjunct} from './functionFoRoutrs/createNewAdjunct'
const router=Router()
//ראוט יצירת ניספח חדש למשימה לפי אידי של המשימה
router.post("/createNewAdjunct",createNewAdjunct)

export default router