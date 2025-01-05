import { Hono } from "hono";
import { Prisma, PrismaClient } from "@prisma/client";
import { z } from 'zod';
import { accepts } from "hono/accepts";

const app = new Hono<{
    Variables: {
        instituteId: String
        prisma: PrismaClient
    }
}>();

type CourseType = z.infer<typeof CourseTypeSchema>

const CourseTypeSchema =  z.enum(["PRACTICAL", "THEORY"])

const ClassSchema = z.object({
    courseId: z.string(),
    facultyId: z.string(),
    roomId: z.string(),
    scheduleId: z.string(),
    studentGroupId: z.string(),
    courseType: CourseTypeSchema,
    batches: z.array(z.object({
        id: z.string()
    })),
    electiveBasketId: z.string().optional()    
})

const manyClassSchema = z.array(ClassSchema)


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
    const filter = c.req.query('filter'); 
    
    try {

        const whereClause: Prisma.ClassWhereInput = {
            scheduleId: scheduleId,
            studentGroupId: studentGroupId,
            courseType: courseType
        };

        if (filter === 'regular') {
            whereClause.electiveBasketId = null;
        } else if (filter === 'elective') {
            whereClause.electiveBasketId = { not: { equals: null } };
        }

        const classes = await prisma.class.findMany({
            where: whereClause,
            select: {
                faculty: {select: {name: true}},
                course: {select: {name: true, code:true}},
                batches: true,
                id: true,
                room: {
                    select: {
                        code: true,
                        academicBlock: {select: {blockCode: true}}
                    }
                }
            },
        });
        return c.json({classes});
    } catch(e) {
        return c.json({message: "Something went wrong"}, 500)
    }

})


// adds a regular theory class to a schedule
app.post('/independent', async (c) => {
    const prisma = c.get("prisma")
    const body =  await c.req.json();
    const { data, success, error } = ClassSchema.safeParse(body);
    console.log(body);
    if(!success) {
        return c.json({message: "invalid Inputs", error}, {status: 400})
    }
    
    try {
        
        await prisma.class.create({
            data: {
                ...data,
                batches: {
                    connect: data.batches
                }
            }
        })

        return c.json({message: "New Theory Class Added"}, 201);
        
    } catch (e) {
        console.error(e);
        return c.json({message: "Something went wrong"}, {status: 500}); 
    }
})


app.post('/concurrent', async (c) => {
    const prisma = c.get("prisma")
    const body =  await c.req.json();
    const { data, success, error } = z.array(ClassSchema).safeParse(body);

    if(!success) {
        return c.json({message: "invalid Inputs", error}, {status: 400})
    }
    
    try {
        const newClasses = await Promise.all(
            data.map(_class => prisma.class.create({
                data: {
                    ..._class,
                    batches: {
                        connect: _class.batches
                    }
                }
            }))
        )
        const concurrentClassesId = newClasses.map(_class => ({
            id: _class.id
        }))
        
        const updatePromises = concurrentClassesId.map((_class) =>
            prisma.class.update({
              where: { id: _class.id },
              data: {
                concurrentClasses: {
                  set: concurrentClassesId,
                },
              },
            })
          );
        
          await Promise.all(updatePromises);
        return c.json({message: "New Class Added"}, 201);

    } catch (e) {
        console.error(e);
        return c.json({message: "Something went wrong"}, {status: 500}); 
    }    
    
})












// adds a class to a schedule
// app.post('/add', async (c) => {
//     const prisma = c.get("prisma")
//     const body =  await c.req.json();
//     const { data, success, error } = classSchema.safeParse(body);

//     if(!success) {
//         return c.json({message: "invalid Inputs", error}, {status: 400})
//     }
    
//     try {
        
//         await prisma.class.create({
//             data: data
//         })
//         return c.json({message: "New Class Added"}, 201);

//     } catch (e) {
//         console.error(e);
//         return c.json({message: "Something went wrong"}, {status: 500}); 
//     }
// })

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

app.post('/addPractical', async (c) => {
    const prisma = c.get("prisma")
    const body =  await c.req.json();
    const { data, success, error } = manyClassSchema.safeParse(body);
    if(!success) {
        return c.json({message: "invalid Inputs", error}, {status: 400})
    }
    try {
        
        const newClasses = await prisma.class.createManyAndReturn({
            data: data
        })

        const concurrentClassesId = newClasses.map(_class => ({
            id: _class.id
        }))
        
        const updatePromises = concurrentClassesId.map((_class) =>
            prisma.class.update({
              where: { id: _class.id },
              data: {
                concurrentClasses: {
                  set: concurrentClassesId,
                },
              },
            })
          );
        
          await Promise.all(updatePromises);
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