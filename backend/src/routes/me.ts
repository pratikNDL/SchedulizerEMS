import { Hono } from "hono";
import { verify } from "hono/jwt";

const app = new Hono<{
    Bindings: {
        JWT_SECRET: string
    }

}>();

app.get('/', async(c) => {
    const token = c.req.header('Authorization') || '';
    
    try {
        const user = await verify(token, c.env.JWT_SECRET)
        return c.json({user})
    }
    catch(e) {
        c.status(401);
        return c.json({e});
    }
})
export default app;