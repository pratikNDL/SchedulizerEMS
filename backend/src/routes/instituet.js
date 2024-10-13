import { Hono } from "hono";
import { instituteSignup } from '@pratikndl/common-schedulizer-ems';
import { sign } from 'hono/jwt';
const app = new Hono();
app.post('/signup', async (c) => {
    const prisma = c.get('prisma');
    const body = await c.req.json();
    const { data, success } = instituteSignup.safeParse(body);
    if (!success) {
        return c.json({ message: "invlid Inputs" }, { status: 400 });
    }
    try {
        const existingInstitute = await prisma.institute.findFirst({
            where: {
                OR: [
                    { name: body.name },
                    { email: body.email },
                ],
            },
        });
        if (existingInstitute) {
            return c.json({ message: "Institute already exists" }, { status: 409 });
        }
        const newInstitute = await prisma.institute.create({
            data: {
                name: body.name,
                email: body.email,
                password: body.password
            },
        });
        const token = await sign({ id: newInstitute.id }, c.env.JWT_SECRET);
        return c.json({ token }, 201);
    }
    catch (e) {
        console.error(e);
        return c.json({ message: "Something went wrong" }, { status: 500 });
    }
});
app.post('/signin', async (c) => {
    const prisma = c.get('prisma');
    const body = await c.req.json();
    const { data, success } = instituteSignup.safeParse(body);
    if (!success) {
        return c.json({ message: "invlid Inputs" }, { status: 400 });
    }
    try {
        const existingInstitute = await prisma.institute.findFirst({
            where: {
                OR: [
                    { name: body.name },
                    { email: body.email },
                ],
            },
        });
        if (existingInstitute) {
            return c.json({ message: "Institute already exists" }, { status: 409 });
        }
        const newInstitute = await prisma.institute.create({
            data: {
                name: body.name,
                email: body.email,
                password: body.password
            },
        });
        const token = await sign({ id: newInstitute.id }, c.env.JWT_SECRET);
        return c.json({ token }, 201);
    }
    catch (e) {
        console.error(e);
        return c.json({ message: "Something went wrong" }, { status: 500 });
    }
});
export default app;
