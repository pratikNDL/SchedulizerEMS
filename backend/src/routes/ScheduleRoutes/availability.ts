import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { z } from 'zod';
import { faculty } from "@pratikndl/common-schedulizer-ems";

const app = new Hono<{
    Variables: {
        instituteId: String
        prisma: PrismaClient
    }
}>();

const AvailabilitySchema = z.object({
    availability: z.array(z.number())
})

// Gets an availability for faculty in a particular schedule
app.get('/faculty/:scheduleId/:facultyId', async (c) => {
    const prisma = c.get("prisma")
    const facultyId = c.req.param('facultyId');
    const scheduleId = c.req.param('scheduleId');
    
    try {
        let availabilityData = await prisma.facultyAvailability.findFirst({
            where: {
                facultyId: facultyId,
                scheduleId: scheduleId
            },
            select: {
                availability: true
            }
        });

        if(!availabilityData) {
            availabilityData = await prisma.facultyAvailability.create({
                data: {
                    facultyId,
                    scheduleId,
                    availability: []
                },
                select: {
                    availability:true
                }
            })
        }
        return c.json({availabilityData});

    } catch(e) {
        return c.json({message: "Something went wrong"}, {status: 500})
    }
})

// Gets an availability for faculty in a particular schedule
app.get('studentGroup/:scheduleId/:studentGroupId', async (c) => {
    const prisma = c.get("prisma")
    const studentGroupId = c.req.param('studentGroupId');
    const scheduleId = c.req.param('scheduleId');
    
    try {
        let availabilityData = await prisma.studentGroupAvailability.findFirst({
            where: {
                studentGroupId: studentGroupId,
                scheduleId: scheduleId
            },
            select: {
                availability:true
            }
        });

        if(!availabilityData) {
            availabilityData = await prisma.studentGroupAvailability.create({
                data: {
                    studentGroupId,
                    scheduleId,
                    availability: []
                },
                select: {
                    availability:true
                }
            })
        }
        return c.json({availabilityData});

    } catch(e) {
        return c.json({message: "Something went wrong"}, {status: 500})
    }
})

// adds an availability for faculty in a particular schedule
app.post('/faculty/:scheduleId/:facultyId', async (c) => {
    const prisma = c.get("prisma")
    const body =  await c.req.json();
    const facultyId = c.req.param('facultyId');
    const scheduleId = c.req.param('scheduleId');
    const { data, success, error } = AvailabilitySchema.safeParse(body);

    if(!success) {
        return c.json({message: "Invalid Inputs", error}, {status: 400})
    }
    
    try {
        const availabilityData = await prisma.facultyAvailability.upsert({
            where: {
                scheduleId_facultyId: {
                    scheduleId: scheduleId,
                    facultyId: facultyId
                }
            },
            update: {
                availability: data.availability
            },
            create: {
                facultyId: facultyId,
                scheduleId: scheduleId,
                availability: data.availability
            },
            select: {
                availability: true
            }
        })
        
        return c.json({availabilityData});

    } catch (e) {
        console.error(e);
        return c.json({message: "Something went wrong"}, {status: 500}); 
    }

})

// adds an availability for faculty in a particular schedule
app.post('/studentGroup/:scheduleId/:studentGroupId', async (c) => {
    const prisma = c.get("prisma")
    const body =  await c.req.json();
    const studentGroupId = c.req.param('studentGroupId');
    const scheduleId = c.req.param('scheduleId');
    const { data, success, error } = AvailabilitySchema.safeParse(body);

    if(!success) {
        return c.json({message: "Invalid Inputs", error}, {status: 400})
    }
    
    try {
        const availabilityData = await prisma.studentGroupAvailability.upsert({
            where: {
                scheduleId_studentGroupId: {
                    scheduleId: scheduleId,
                    studentGroupId: studentGroupId
                }
            },
            update: {
                availability: data.availability
            },
            create: {
                studentGroupId: studentGroupId,
                scheduleId: scheduleId,
                availability: data.availability
            },
            select: {
                availability: true
            }
        })

        return c.json({availabilityData});

    } catch (e) {
        console.error(e);
        return c.json({message: "Something went wrong"}, {status: 500}); 
    }

})


export default app;