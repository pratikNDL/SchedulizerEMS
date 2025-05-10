import { Hono } from "hono";
import instituteRouter from './instituet'
import departmentRouter from './department'
import facultyRouter from './faculty'
import meRouter from './me'
import infrastructureRouter from './infrastructure'
import courseRouter from './course'
import scheduleRouter from './ScheduleRoutes/schedule'
import studentGroupRouter from './studentGroup'
import electiveRouter from './elective'
import algoInputRouter from './algorithmInputs';
export const router = new Hono();

router.route('/me', meRouter)
router.route('/institute', instituteRouter)
router.route('/department', departmentRouter)
router.route('/faculty', facultyRouter)
router.route('/infrastructure', infrastructureRouter)
router.route('/course', courseRouter)
router.route('/schedule', scheduleRouter)
router.route('/studentGroup', studentGroupRouter)
router.route('/elective', electiveRouter)
router.route('/algorithmInput',algoInputRouter)