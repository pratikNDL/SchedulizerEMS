import { Hono } from "hono";
import { authAdmin } from "../middlewares/authAdmin";
import { PrismaClient } from "@prisma/client";
import { scheduleInput } from "@pratikndl/common-schedulizer-ems";

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
        const schedules = await prisma.schedule.findMany({
            where: {
                name: { contains: query, mode: 'insensitive' } ,
                instituteId: instituteId
            }
        });
        return c.json({schedules});

    } catch(e) {
        return c.json({message: "Something went wrong"}, {status: 500})
    }
})



app.post('/', async (c) => {
    const instituteId = c.get("instituteId") as string;
    const prisma = c.get("prisma")
    const body = await c.req.json();

    const {data, success} = scheduleInput.safeParse(body);

    if(!success) {
        return c.json({message: "invalid Inputs"}, {status: 400})
    }
    
    try {        
        console.log(data)
        const existingSchedule = await prisma.schedule.findFirst({
            where: {
                name: data.name,
                instituteId: instituteId    
            }
        });

        console.log(existingSchedule);
        if (existingSchedule) {
            return c.json({message: "Schedule with same name exist"}, {status: 409}); 
        }

        const newSchedule = await prisma.schedule.create({
            data: {
                ...data,
                instituteId: instituteId
            }
        })

        return c.json({message: "New Schedule Created", newSchedule}, {status: 201});

    } catch (e) {
        console.error(e);
        return c.json({message: "Something went wrong"}, {status: 500}); 
    }
})



export default app;