import { Context, Next } from "hono";
import { verify } from "hono/jwt";

export const authAdmin = async (c: Context, next: Next) => {
    const authHeader = c.req.header("authorization") || "";

    

    try {
        const payload = await verify(authHeader, c.env.JWT_SECRET)
        c.set("instituteId", payload.id);
        await next();
        
    } catch(e) {
        return c.json({
            message: "Inavlid Tokken"
        }, {
            status: 401
        })
    }
}