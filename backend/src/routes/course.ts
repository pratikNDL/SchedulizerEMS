import { Hono } from "hono";
import { z } from 'zod'
import { authAdmin } from "../middlewares/authAdmin";
import { Prisma, PrismaClient } from "@prisma/client";


const app = new Hono<{
    Variables: {
        instituteId: String
        prisma: PrismaClient
    }
}>();

export const CourseTypeSchema =  z.enum(["PRACTICAL", "THEORY"])
type CourseType = z.infer<typeof CourseTypeSchema>
const CourseInput = z.object({
    name: z.string(),
    code: z.string(),
    credits: z.number(),
    departmentId: z.string(),
    courseType: CourseTypeSchema,
    electiveBasketId: z.string().optional()
})

app.use(authAdmin);
app.get('/', async (c) => {
    const prisma = c.get("prisma");
    const instituteId = c.get("instituteId") as string;
    const query = c.req.query('name') || "";
    const courseType = c.req.query('courseType') as CourseType;
    const filter = c.req.query('filter'); 

    try {
        const whereClause: Prisma.CourseWhereInput = {
            OR: [
                { name: { contains: query, mode: 'insensitive' } },
                { code: { contains: query, mode: 'insensitive' } },
            ],
            courseType: courseType,
            instituteId: instituteId
        };

        if (filter === 'regular') {
            whereClause.electiveBasketId = null;
        } else if (filter === 'elective') {
            whereClause.electiveBasketId = { not: { equals: null } };
        }

        const courses = await prisma.course.findMany({ where: whereClause });

        return c.json({ courses });

    } catch (e) {
        return c.json({ message: "Something went wrong" }, { status: 500 });
    }
});



app.post('/', async (c) => {
    const instituteId = c.get("instituteId") as string;
    const prisma = c.get("prisma")
    const body = await c.req.json();

    const {data, success, error} = CourseInput.safeParse(body);

    if(!success) {
        return c.json({message: "invalid Inputs", error}, {status: 400})
    }

    
    try {        
        
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

app.post('/multiple', async (c) => {
    const instituteId = c.get("instituteId") as string;
    const prisma = c.get("prisma")
    const body = await c.req.json();

    const {data, success, error} = z.array(CourseInput).safeParse(body);

    if(!success) {
        return c.json({message: "invalid Inputs", error}, {status: 400})
    }

    const newData = data.map(course => ({
        ...course,
        instituteId: instituteId
    }))
    
    try {        
        
        
        const newCourses = await prisma.course.createMany({
            data: newData
        })

        return c.json({message: "New Courses Added", newCourses}, {status: 201});

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