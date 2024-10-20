import { Hono } from "hono";
import { authAdmin } from "../middlewares/authAdmin";
import { PrismaClient } from "@prisma/client";
import { courseInput } from "@pratikndl/common-schedulizer-ems";

const app = new Hono<{
    Variables: {
        instituteId: String
        prisma: PrismaClient
    }
}>();

app.use(authAdmin);


app.get('/', async (c) => {
    const instituteId = c.get("instituteId") as string;
    const prisma = c.get("prisma")
    const query = c.req.query('name');
    
    try {
        const courses = await prisma.course.findMany({
            where: {
                OR: [
                    { name: { contains: query, mode: 'insensitive' } },
                    { code: { contains: query, mode: 'insensitive' } },
                ],
                instituteId: instituteId
            }
        });
        return c.json({courses});

    } catch(e) {
        return c.json({message: "Something went wrong"}, {status: 500})
    }
})



app.post('/', async (c) => {
    const instituteId = c.get("instituteId") as string;
    const prisma = c.get("prisma")
    const body = await c.req.json();

    const {data, success, error} = courseInput.safeParse(body);

    if(!success) {
        return c.json({message: "invlid Inputs", error}, {status: 400})
    }
    
    try {        
        const existingCourse = await prisma.course.findFirst({
            where: {
                OR: [
                    {code: data.code}, 
                ],
                instituteId: instituteId    
            }
        });

        
        if (existingCourse) {
            return c.json({message: "Department with same name or code already exist"}, {status: 409}); 
        }

        
        const newRoom = await prisma.course.create({
            data: {
                ...data,
                instituteId: instituteId
            }
        })

        return c.json({message: "New Department Created", newRoom}, {status: 201});

    } catch (e) {
        console.error(e);
        return c.json({message: "Something went wrong"}, {status: 500}); 
    }
})



export default app;