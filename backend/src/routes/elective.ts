import { Hono } from "hono";
import { z } from 'zod'
import { authAdmin } from "../middlewares/authAdmin";
import { CourseType, Prisma, PrismaClient } from "@prisma/client";
import { department } from "@pratikndl/common-schedulizer-ems";
import { CourseTypeSchema } from "./course";


const app = new Hono<{
    Variables: {
        instituteId: String
        prisma: PrismaClient
    }
}>();

const ElectiveBasketInput = z.object({
    name: z.string(),
    code: z.string(),
    credits: z.number(),
    courseCount: z.number(),
    departmentId: z.string(),
    courseType: CourseTypeSchema
})

app.use(authAdmin);

// get all all elective baskets associated with institute
app.get('/', async (c) => {
    const instituteId = c.get("instituteId") as string;
    const prisma = c.get("prisma");
    const query = c.req.query('name') || "";
    const courseType = c.req.query('courseType') as CourseType;
    const filter = c.req.query('filter'); 
    console.log(query, courseType, filter)

    try {
        const whereClause: Prisma.ElectiveBasketWhereInput = {
            OR: [
                { name: { contains: query, mode: 'insensitive' } },
                { code: { contains: query, mode: 'insensitive' } },
            ],
            courseType: courseType,
            instituteId: instituteId,
        };

        

        const electiveBaskets = await prisma.electiveBasket.findMany({ 
            where: whereClause,
            include: {
                courses: {
                    select: {
                        name: true,
                        id: true,
                        code: true,
                    }
                }
            }
        });

        return c.json({ electiveBaskets });

    } catch (e) {
        return c.json({ message: "Something went wrong" }, { status: 500 });
    }
});

app.post('/', async (c) => {
    const instituteId = c.get("instituteId") as string;
    const prisma = c.get("prisma")
    const body = await c.req.json();
    const {data, success, error} = ElectiveBasketInput.safeParse(body);

    if(!success) {
        return c.json({message: "invalid Inputs", error}, 400)
    }
    
    try {                
        const newBasket = await prisma.electiveBasket.create({
            data: {
                ...data,
                instituteId: instituteId
            }
        })

        return c.json({message: "New Elective Basket Created Created", electiveBasket:newBasket}, {status: 201});

    } catch (e) {
        console.error(e);
        return c.json({message: "Something went wrong"}, {status: 500}); 
    }
})






app.delete('/:id', async (c) => {
    const prisma = c.get("prisma")
    const id = c.req.param('id');

    try {        
        await prisma.electiveBasket.delete({
            where:{
                id: id
            }
        })

        return c.json({message: "Elective Basket Deleted", }, {status: 201});

    } catch (e) {
        console.error(e);
        return c.json({message: "Something went wrong"}, {status: 500}); 
    }
})
export default app;