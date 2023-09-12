import { Router } from "express"
import LoggedOff from "./functionFoRoutrs/LoggedOff"

const router=Router()


//ראוט יצירת ניספח חדש למשימה לפי אידי של המשימה
router.post("/logged-off",LoggedOff)

export default router