import { PrismaClient } from "@prisma/client/edge";
import { Hono } from "hono";
import { instituteSignup, instituteSignin } from '@pratikndl/common-schedulizer-ems';
import { sign } from 'hono/jwt';
import bcrypt from 'bcryptjs';  

const app = new Hono<{
    Bindings: {
        JWT_SECRET: string;   
    };
    Variables: {
        prisma: PrismaClient;
    };
}>();


app.post('/signup', async (c) => {
    const prisma = c.get('prisma');
    const body = await c.req.json();
    const { data, success } = instituteSignup.safeParse(body);

    if (!success) {
        return c.json({ message: "Invalid inputs" }, { status: 400 });
    }

    try {
        const existingInstitute = await prisma.institute.findFirst({
            where: {
                OR: [
                    { name: data.name },
                    { email: data.email },
                ],
            },
        });

        if (existingInstitute) {
            return c.json({ message: "Institute already exists" }, { status: 409 });
        }

        
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const newInstitute = await prisma.institute.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword, 
            },
        });
     console.log(hashedPassword);
        const token = await sign({ id: newInstitute.id }, c.env.JWT_SECRET);
        return c.json({ token }, 201);

    } catch (e) {
        return c.json({ message: "Something went wrong" }, { status: 500 });
    }
});


app.post('/signin', async (c) => {
    const prisma = c.get('prisma');
    const body = await c.req.json();
    const { data, success } = instituteSignin.safeParse(body);

    if (!success) {
        return c.json({ message: "Invalid inputs" }, { status: 400 });
    }

    try {
        const existingInstitute = await prisma.institute.findFirst({
            where: {
                email: data.email,
            },
        });

        if (!existingInstitute) {
            return c.json({ message: "Incorrect email/password" }, { status: 409 });
        }

        
        const isPasswordValid = await bcrypt.compare(data.password, existingInstitute.password);


        if (!isPasswordValid) {
            return c.json({ message: "Incorrect email/password" }, { status: 409 });
        }

        const token = await sign({ id: existingInstitute.id }, c.env.JWT_SECRET);
        return c.json({ token }, 200);

    } catch (e) {
        return c.json({ message: "Something went wrong" }, { status: 500 });
    }
});

export default app;
