import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { z } from 'zod';
import { accepts } from "hono/accepts";

const app = new Hono<{
    Variables: {
        instituteId: String
        prisma: PrismaClient
    }
}>();

const CourseTypeSchema =  z.enum(["REGULAR_THEORY", "REGULAR_PRACTICAL", "PROGRAM_ELECTIVE_THEORY", "PROGRAM_ELECTIVE_PRACTICAL"])
type CourseType = z.infer<typeof CourseTypeSchema>
const classSchema = z.object({
    courseId: z.string(),
    facultyId: z.string(),
    roomId: z.string(),
    scheduleId: z.string(),
    studentGroupId: z.string(),
    batchId: z.string().optional(),
    courseType: CourseTypeSchema,
})
const manyClassSchema = z.array(classSchema)


// gets all classes for a schedule
app.get('/:scheduleId', async (c) => {
    const prisma = c.get("prisma")
    const scheduleId = c.req.param('scheduleId');
    
    try {
        const classes = await prisma.class.findMany({
            where: {
                scheduleId: scheduleId
            },
        });

        return c.json({classes});

    } catch(e) {
        return c.json({message: "Something went wrong"}, 500)
    }
})

// gets all classes for a schedule (for a particular studentGroup)
app.get('/:scheduleId/:studentGroupId', async (c) => {
    const prisma = c.get("prisma")
    const scheduleId = c.req.param('scheduleId');
    const studentGroupId = c.req.param('studentGroupId');
    const courseType = c.req.query('courseType') as CourseType;
    
    try {
        const classes = await prisma.class.findMany({
            where: {
                scheduleId: scheduleId,
                studentGroupId: studentGroupId,
                courseType: courseType
            },
            select: {
                faculty: {select: {name: true}},
                course: {select: {name: true, code:true}},
                batch: true,
                id: true,
                room: {
                    select: {
                        code: true,
                        academicBlock: {select: {blockCode: true}}
                    }
                }
            }
        });
        return c.json({classes});
    } catch(e) {
        return c.json({message: "Something went wrong"}, 500)
    }
})

// adds a class to a schedule
app.post('/add', async (c) => {
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

// add multiple classes to a schedule (for different batches of same StudentGroup)
app.post('/addMany', async (c) => {
    const prisma = c.get("prisma")
    const body =  await c.req.json();
    const { data, success, error } = manyClassSchema.safeParse(body);

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

// Delete a class
app.delete('/:classId', async (c) => {
    const prisma = c.get("prisma")
    const classId = c.req.param('classId');

    try {        
        await prisma.class.delete({
            where:{
                id: classId
            }
        })

        return c.json({message: "schedule Deleted", }, {status: 201});

    } catch (e) {
        console.error(e);
        return c.json({message: "Something went wrong"}, {status: 500}); 
    }
})




export default app;