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

const classSchema = z.object({
    courseId: z.string(),
    facultyId: z.string(),
    roomId: z.string(),
    scheduleId: z.string(),
    studentGroupId: z.string(),
    batchId: z.string().optional(),
    isLab: z.boolean().optional(),
})

const practicalClassSchema = z.array(classSchema);

app.get('/:scheduleId', async (c) => {
    const prisma = c.get("prisma")
    const scheduleId = c.req.param('scheduleId');
    
    try {
        const schedule = await prisma.schedule.findFirst({
            where: {
                id: scheduleId
            },
            select: {
                classes: true
            }
        });

        if(!schedule) return c.json({message: 'No Such Schedule'}, 409)
        return c.json({classes: schedule.classes});

    } catch(e) {
        return c.json({message: "Something went wrong"}, 500)
    }
})


app.get('theory/:scheduleId', async (c) => {
    const prisma = c.get("prisma")
    const scheduleId = c.req.param('scheduleId');
    
    try {
        const schedule = await prisma.schedule.findFirst({
            where: {
                id: scheduleId
            },
            select: {
                classes: {
                    where: {
                        isLab: false
                    }
                }
            }
        });

        if(!schedule) return c.json({message: 'No Such Schedule'}, 409)
        return c.json({classes: schedule.classes});

    } catch(e) {
        return c.json({message: "Something went wrong"}, 500)
    }
})

app.get('practical/:scheduleId', async (c) => {
    const prisma = c.get("prisma")
    const scheduleId = c.req.param('scheduleId');
    
    try {
        const schedule = await prisma.schedule.findFirst({
            where: {
                id: scheduleId
            },
            select: {
                classes: {
                    where: {
                        isLab: true
                    }
                }
            }
        });

        if(!schedule) return c.json({message: 'No Such Schedule'}, 409)
        return c.json({classes: schedule.classes});

    } catch(e) {
        return c.json({message: "Something went wrong"}, 500)
    }
})
app.post('/theory', async (c) => {
    const prisma = c.get("prisma")
    const body =  await c.req.json();
    const { data, success, error } = classSchema.safeParse(body);

    if(!success) {
        return c.json({message: "invalid Inputs", error}, {status: 400})
    }
    
    try {
        
        await prisma.class.create({
            data: data
        })
        return c.json({message: "New Class Added"}, 201);

    } catch (e) {
        console.error(e);
        return c.json({message: "Something went wrong"}, {status: 500}); 
    }
})

app.post('/practical', async (c) => {
    const prisma = c.get("prisma")
    const body =  await c.req.json();
    const { data, success, error } = practicalClassSchema.safeParse(body);

    if(!success) {
        return c.json({message: "invalid Inputs", error}, {status: 400})
    }
    
    try {
        
        await prisma.class.createMany({
            data: data
        })
        return c.json({message: "New Class Added"}, 201);

    } catch (e) {
        console.error(e);
        return c.json({message: "Something went wrong"}, {status: 500}); 
    }
})

// app.put('/', async (c) => {
//     const prisma = c.get("prisma")
//     const body =  await c.req.json();
//     const { data, success, error } = FacultyConstraintUpdate.safeParse(body);

//     if(!success) {
//         return c.json({message: "invalid Inputs", error}, {status: 400})
//     }
    
//     try {
//         const existingFacultyConstraint = await prisma.facultyConstraints.findFirst({
//             where: {
//                 id: data.id
//             }
//         });

//         if (!existingFacultyConstraint) {
//             return c.json({message: "No Record Found"}, {status: 409}); 
//         }

        
//         const updatedFacultyConstraints = await prisma.facultyConstraints.update({
//             where: {
//                 id: data.id
//             },
//             data: {
//                 constraints: data.constraints
//             }
//         });

//         return c.json({message: "Record Updated", faculty:existingFacultyConstraint}, {status: 201});

//     } catch (e) {
//         console.error(e);
//         return c.json({message: "Something went wrong"}, {status: 500}); 
//     }

// })

// app.delete('/:facultyId', async (c) => {
//     const prisma = c.get("prisma")
//     const facultyId = c.req.param('facultyId');

//     try {        
//         await prisma.schedule.delete({
//             where:{
//                 id: id
//             }
//         })

//         return c.json({message: "schedule Deleted", }, {status: 201});

//     } catch (e) {
//         console.error(e);
//         return c.json({message: "Something went wrong"}, {status: 500}); 
//     }
// })




export default app;