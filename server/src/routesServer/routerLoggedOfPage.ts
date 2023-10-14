import { Router } from "express"
import {LoggedOff, getAllUsers} from "./functionFoRoutrs/LoggedOff"

const router=Router()


//ראוט יצירת ניספח חדש למשימה לפי אידי של המשימה
router.post("/logged-off",LoggedOff)

router.get("/getAllUsers",getAllUsers)

export default router