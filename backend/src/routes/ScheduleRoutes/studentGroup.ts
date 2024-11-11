import { Hono } from "hono";
import { authAdmin } from "../../middlewares/authAdmin";
import { PrismaClient } from "@prisma/client";
import { z } from 'zod';
import { faculty } from "@pratikndl/common-schedulizer-ems";

const app = new Hono<{
    Variables: {
        instituteId: String
        prisma: PrismaClient
    }
}>();

// Gets all studentGroups in  a particular Schedule
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
                studentGroups: {
                    where: {
                        name: {contains: query, mode: 'insensitive'}
                    },
                    select : {
                        id: true,
                        name: true,
                        passingYear: true,
                        section: true,
                        batchCount: true,
                        department: {
                            select: {
                                code: true
                            }
                        }   
                    }
                }
            }
        });

        if (!existingSchedule) {
            return c.json({message: "No such Schedule"}, {status: 409}); 
        }

        return c.json({studentGroups: existingSchedule.studentGroups}, {status: 201});
    } catch (e) {
        return c.json({message: "Something went wrong"}, {status: 500}); 
    }
})

// Gets all classes associated with a particular StudentGroup in a particular Schedule
app.get(':studentGroupId/class/:scheduleId', async (c) => {
    const prisma = c.get("prisma")
    const scheduleId = c.req.param('scheduleId');
    const studentGroupId = c.req.param('studentGroupId');
    const showLabs = c.req.query('showLabs') == 'true' ? true : false
    

    try {
        const existingSchedule = await prisma.schedule.findFirst({
            where: {
                id: scheduleId
            },
            select: {
                classes: {
                    where: {
                        studentGroupId: studentGroupId,
                        isLab: showLabs,
                    },
                    select: {
                        id: true,
                        faculty: true,
                        course: true,
                        room: {
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
                        },
                        batch: {
                            select: {
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

        return c.json({classes : existingSchedule.classes}, {status: 201});
    } catch (e) {
        return c.json({message: "Something went wrong"}, {status: 500}); 
    }
})

app.put('/:scheduleId/:studentGroupId', async (c) => {
    const prisma = c.get("prisma")
    const studentGroupId = c.req.param('studentGroupId');
    const scheduleId = c.req.param('scheduleId');

    try {
        const existingSchedule = await prisma.schedule.findFirst({
            where: {
                id: scheduleId
            }
        });

        if (!existingSchedule) {
            return c.json({message: "No such Schedule"}, {status: 409}); 
        }

        const existingStudentGroup = await prisma.studentGroup.findFirst({
            where: {
                id: studentGroupId
            }
        });

        if (!existingStudentGroup) {
            return c.json({message: "No such StudentGroup"}, {status: 409}); 
        }

       
        
            await prisma.schedule.update({
                where: {
                    id: scheduleId,   
                },
                data : {
                    studentGroups: {
                        connect: {id: studentGroupId}
                    }
                }
            })

        

     
        return c.json({message: "Schedule Updated"}, {status: 201});
    } catch (e) {
        return c.json({message: "Something went wrong"}, {status: 500}); 
    }
})

app.delete('/:scheduleId/:studentGroupId', async (c) => {
    const prisma = c.get("prisma")
    const studentGroupId = c.req.param('studentGroupId');
    const scheduleId = c.req.param('scheduleId');

    try {
        const existingSchedule = await prisma.schedule.findFirst({
            where: {
                id: scheduleId
            }
        });

        if (!existingSchedule) {
            return c.json({message: "No such Schedule"}, {status: 409}); 
        }

        const existingStudentGroup = await prisma.studentGroup.findFirst({
            where: {
                id: studentGroupId
            }
        });

        if (!existingStudentGroup) {
            return c.json({message: "No such StudentGroup"}, {status: 409}); 
        }

        await prisma.schedule.update({
            where: {
                id: scheduleId,   
            },
            data : {
                studentGroups: {
                    disconnect: {id: studentGroupId}
                }
            }

        })

        

        return c.json({message: "Schedule Updated"}, {status: 201});
    } catch (e) {
        return c.json({message: "Something went wrong"}, {status: 500}); 
    }
})




export default app;