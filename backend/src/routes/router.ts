import { Hono } from "hono";
import instituteRouter from './instituet'

export const router = new Hono();

router.route('/institute', instituteRouter)

