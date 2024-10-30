import { Hono } from "hono";
import { authAdmin } from "../middlewares/authAdmin";
import { PrismaClient } from "@prisma/client";
import { scheduleInput } from "@pratikndl/common-schedulizer-ems";
import { z } from 'zod';

const app = new Hono<{
    Variables: {
        instituteId: String
        prisma: PrismaClient
    }
}>();

app.use(authAdmin);

const roomsInput = z.object({
    rooms: z.array(z.string()),
})


app.get('/:id', async (c) => {
    const prisma = c.get("prisma")
    const id = c.req.param('id');
    
    try {
        const schedule = await prisma.schedule.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                name: true,
                rooms: true
            }
        });
        return c.json({schedule});

    } catch(e) {
        return c.json({message: "Something went wrong"}, {status: 500})
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

app.put('/rooms/:id', async (c) => {
    const instituteId = c.get("instituteId") as string;
    const prisma = c.get("prisma")
    const id = c.req.param('id');
    const body = await c.req.json();
    

    const {data, success, error} = roomsInput.safeParse(body);

    if(!success) {
        return c.json({message: "invalid Inputs", error}, {status: 400})
    }
    
    try {        
        const schedule = await prisma.schedule.findFirst({
            where: {
                id: id,
                instituteId: instituteId    
            }
        });

    
        if (!schedule) {
            return c.json({message: "no such schedule exist"}, {status: 409}); 
        }

        const updatesSchedule = await prisma.schedule.update({
            where: {
                id: id
            },
            data: {
                rooms: {
                    set: data.rooms.map((id) => ({id: id}))
                }
            }
        })
        

        return c.json({message: "Rooms Updated", updatesSchedule}, {status: 201});

    } catch (e) {
        return c.json({message: "Something went wrong"}, {status: 500}); 
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

export default app;