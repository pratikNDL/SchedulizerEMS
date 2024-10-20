import { Hono } from "hono";
import instituteRouter from './instituet'
import departmentRouter from './department'
import facultyRouter from './faculty'
import meRouter from './me'
import infrastructreRouter from './infrastructue'
import courseRouter from './course'

export const router = new Hono();

router.route('/me', meRouter)
router.route('/institute', instituteRouter)
router.route('/department', departmentRouter)
router.route('/faculty', facultyRouter)
router.route('/infrastructue', infrastructreRouter)
router.route('/course', courseRouter)

