import { Hono } from 'hono';
import { initPrisma } from './middlewares/initPrisma';
import { router } from './routes/router';
const app = new Hono();
app.use('*', initPrisma);
app.route('/api/v1', router);
export default app;
