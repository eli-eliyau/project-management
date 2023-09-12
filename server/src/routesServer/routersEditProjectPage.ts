import {Router} from "express"
import { editProjectPage } from "./functionFoRoutrs/editProjectPage"

const router =Router()
//ראוט שמעדכן פרויקט בטבלה לפי אידי
router.put("/editProject",editProjectPage)


export default router