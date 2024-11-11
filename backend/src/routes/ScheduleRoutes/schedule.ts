import { Hono } from "hono";
import { authAdmin } from "../../middlewares/authAdmin";
import { PrismaClient } from "@prisma/client";
import { z } from 'zod';
import facultyRouter from './faculty'
import studentGroupRouter from './studentGroup'
import roomRouter from './room'
import classRouter from './class'
import studentGroupConstraintRouter from './studentGroupConstraint'

const app = new Hono<{
    Variables: {
        instituteId: String
        prisma: PrismaClient
    }
}>();

const scheduleInput = z.object({
    name: z.string().min(1),
    days: z.number().min(1, 'Days must be 1 or more').max(7, 'Days must be 7 or less'),
    slots: z.number().min(1, 'Slots must be 1 or more').max(24, 'Days must be 24 or less')
})


app.use(authAdmin);
app.route('/faculty', facultyRouter)
app.route('/studentGroup', studentGroupRouter)
app.route('/room', roomRouter)
app.route('/class', classRouter)
app.route('/studentGroupConstraint', studentGroupConstraintRouter)





app.get('/:id', async (c) => {
    const prisma = c.get("prisma")
    const id = c.req.param('id');
    
    try {
        const schedule = await prisma.schedule.findFirst({
            where: {
                id: id
            },
        });
        return c.json({schedule});

    } catch(e) {
        return c.json({message: "Something went wrong"}, {status: 500})
    }
})

app.delete('/:id', async (c) => {
    const prisma = c.get("prisma")
    const id = c.req.param('id');

    try {        
        await prisma.schedule.delete({
            where:{
                id: id
            }
        })

        return c.json({message: "schedule Deleted", }, {status: 201});

    } catch (e) {
        console.error(e);
        return c.json({message: "Something went wrong"}, {status: 500}); 
    }
})

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
        
        const existingSchedule = await prisma.schedule.findFirst({
            where: {
                name: data.name,
                instituteId: instituteId    
            }
        });

        
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
        
        return c.json({message: "Something went wrong"}, {status: 500}); 
    }
})


export default app;