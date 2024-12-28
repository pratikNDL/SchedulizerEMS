import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { z } from 'zod';

const app = new Hono<{
    Variables: {
        instituteId: String
        prisma: PrismaClient
    }
}>();

const roomsInput = z.object({
    rooms: z.array(z.string()),
})



app.get('/:scheduleId', async (c) => {
    const prisma = c.get("prisma")
    const scheduleId = c.req.param('scheduleId');
    const query = c.req.query('name')

    try {
        const existingSchedule = await prisma.schedule.findFirst({
            where: {
                id: scheduleId
            },
            select: {
                rooms: {
                    where: {
                        code: {contains: query, mode: 'insensitive'}
                    },
                    select: {
                        code: true,
                        floor: true,
                        isLab: true,
                        capacity: true,
                        id: true,
                        academicBlock: {
                            select: {
                                blockCode: true,
                                name: true
                            }
                        }
                    }
                }
            }
        });

        if (!existingSchedule) {
            return c.json({message: "No such Schedule"}, {status: 409}); 
        }

        return c.json({rooms: existingSchedule.rooms}, {status: 201});
    } catch (e) {
        return c.json({message: "Something went wrong"}, {status: 500}); 
    }
})

app.put('/:id', async (c) => {
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




export default app;