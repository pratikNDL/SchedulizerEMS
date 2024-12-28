import { Hono } from "hono";
import { z } from 'zod'
import { authAdmin } from "../middlewares/authAdmin";
import { PrismaClient } from "@prisma/client";


const app = new Hono<{
    Variables: {
        instituteId: String
        prisma: PrismaClient
    }
}>();

const CourseTypeSchema =  z.enum(["REGULAR_THEORY", "REGULAR_PRACTICAL", "PROGRAM_ELECTIVE_THEORY", "PROGRAM_ELECTIVE_PRACTICAL"])
type CourseType = z.infer<typeof CourseTypeSchema>
const CourseInput = z.object({
    name: z.string(),
    code: z.string(),
    credits: z.number(),
    departmentId: z.string(),
    courseType: CourseTypeSchema
})

app.use(authAdmin);
app.get('/', async (c) => {
    const instituteId = c.get("instituteId") as string;
    const prisma = c.get("prisma")
    const query = c.req.query('name');
    const courseType = c.req.query('courseType') as CourseType;
    
    try {
        const courses = await prisma.course.findMany({
            where: {
                OR: [
                    { name: { contains: query, mode: 'insensitive' } },
                    { code: { contains: query, mode: 'insensitive' } },
                ],
                instituteId: instituteId,
                courseType: courseType
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

    const {data, success, error} = CourseInput.safeParse(body);

    if(!success) {
        return c.json({message: "invalid Inputs", error}, {status: 400})
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


app.delete('/:id', async (c) => {
    const prisma = c.get("prisma")
    const id = c.req.param('id');

    try {        
        await prisma.course.delete({
            where:{
                id: id
            }
        })

        return c.json({message: "course Deleted", }, {status: 201});

    } catch (e) {
        console.error(e);
        return c.json({message: "Something went wrong"}, {status: 500}); 
    }
})
export default app;