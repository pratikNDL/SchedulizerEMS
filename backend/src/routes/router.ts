import { Hono } from "hono";
import instituteRouter from './instituet'
import departmentRouter from './department'
import facultyRouter from './faculty'

export const router = new Hono();

router.route('/institute', instituteRouter)
router.route('/department', departmentRouter)
router.route('/faculty', facultyRouter)
