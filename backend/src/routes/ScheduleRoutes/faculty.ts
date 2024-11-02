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


const FacultyConstraintInput = z.object({
    facultyId : z.string(),
    scheduleId: z.string(),
    constraints: z.array(z.number())
})

const FacultyConstraintUpdate = z.object({
    id: z.string(),
    constraints: z.array(z.number())
})

app.get('/', async (c) => {
    const prisma = c.get("prisma")
    const facultyId = c.req.query('facultyId');
    const scheduleId = c.req.query('scheduleId');
    
    try {
        const faculty = await prisma.facultyConstraints.findFirst({
            where: {
                facultyId: facultyId,
                scheduleId: scheduleId
            },
            select: {
                id: true,
                constraints: true
            }
        });
        return c.json({faculty});

    } catch(e) {
        return c.json({message: "Something went wrong"}, {status: 500})
    }
})

app.post('/', async (c) => {
    const prisma = c.get("prisma")
    const body =  await c.req.json();
    const { data, success, error } = FacultyConstraintInput.safeParse(body);

    if(!success) {
        return c.json({message: "invalid Inputs", error}, {status: 400})
    }
    
    try {
        const existingFacultyConstraint = await prisma.facultyConstraints.findFirst({
            where: {
                facultyId: data.facultyId,
                scheduleId: data.scheduleId
            },
            select: {
                id: true,
                constraints: true
            }
        });

        if (existingFacultyConstraint) {
            return c.json({message: "Constraint with same detail code already exist"}, {status: 409}); 
        }

        const newFacultyConstraint = await prisma.facultyConstraints.create({
            data: {
                ...data,
            }
        })

        return c.json({message: "New Faculty Constraint Created", faculty:newFacultyConstraint}, {status: 201});

    } catch (e) {
        console.error(e);
        return c.json({message: "Something went wrong"}, {status: 500}); 
    }

})

app.put('/', async (c) => {
    const prisma = c.get("prisma")
    const body =  await c.req.json();
    const { data, success, error } = FacultyConstraintUpdate.safeParse(body);

    if(!success) {
        return c.json({message: "invalid Inputs", error}, {status: 400})
    }
    
    try {
        const existingFacultyConstraint = await prisma.facultyConstraints.findFirst({
            where: {
                id: data.id
            }
        });

        if (!existingFacultyConstraint) {
            return c.json({message: "No Record Found"}, {status: 409}); 
        }

        
        const updatedFacultyConstraints = await prisma.facultyConstraints.update({
            where: {
                id: data.id
            },
            data: {
                constraints: data.constraints
            }
        });

        return c.json({message: "Record Updated", faculty:existingFacultyConstraint}, {status: 201});

    } catch (e) {
        console.error(e);
        return c.json({message: "Something went wrong"}, {status: 500}); 
    }

})

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