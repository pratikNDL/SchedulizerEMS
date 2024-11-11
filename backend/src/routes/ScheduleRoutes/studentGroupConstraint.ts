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


const studentGroupConstraintInput = z.object({
    studentGroupId : z.string(),
    scheduleId: z.string(),
    constraints: z.array(z.number())
})

const studentGroupConstraintUpdate = z.object({
    id: z.string(),
    constraints: z.array(z.number())
})

app.get('/', async (c) => {
    const prisma = c.get("prisma")
    const studentGroupId = c.req.query('studentGroupId');
    const scheduleId = c.req.query('scheduleId');
    
    try {
        const studentGroupConstraint = await prisma.studentGroupConstraints.findFirst({
            where: {
                studentGroupId: studentGroupId,
                scheduleId: scheduleId
            },
            select: {
                id: true,
                constraints: true
            }
        });
        return c.json({studentGroupConstraint});

    } catch(e) {
        return c.json({message: "Something went wrong"}, {status: 500})
    }
})

app.post('/', async (c) => {
    const prisma = c.get("prisma")
    const body =  await c.req.json();
    const { data, success, error } = studentGroupConstraintInput.safeParse(body);

    if(!success) {
        return c.json({message: "invalid Inputs", error}, {status: 400})
    }
    
    try {
        const existingStudentGroupConstraints= await prisma.studentGroupConstraints.findFirst({
            where: {
                studentGroupId: data.studentGroupId,
                scheduleId: data.scheduleId
            },
            select: {
                id: true,
                constraints: true
            }
        });

        if (existingStudentGroupConstraints) {
            return c.json({message: "Constraint with same detail code already exist"}, {status: 409}); 
        }

        const newStudentGroupConstraints = await prisma.studentGroupConstraints.create({
            data: {
                ...data,
            }
        })

        return c.json({message: "New Student Group Constraint Created", studentGroupConstraint:newStudentGroupConstraints}, {status: 201});

    } catch (e) {
        console.error(e);
        return c.json({message: "Something went wrong"}, {status: 500}); 
    }

})

app.put('/', async (c) => {
    const prisma = c.get("prisma")
    const body =  await c.req.json();
    const { data, success, error } = studentGroupConstraintUpdate.safeParse(body);

    if(!success) {
        return c.json({message: "invalid Inputs", error}, {status: 400})
    }
    
    try {
        const existingStudentGroupConstraints = await prisma.studentGroupConstraints.findFirst({
            where: {
                id: data.id
            }
        });

        if (!existingStudentGroupConstraints) {
            return c.json({message: "No Record Found"}, {status: 409}); 
        }

        
        const updatedStudentGroupConstraints= await prisma.studentGroupConstraints.update({
            where: {
                id: data.id
            },
            data: {
                constraints: data.constraints
            }
        });

        return c.json({message: "Record Updated", studentGroupConstraint:updatedStudentGroupConstraints}, {status: 201});

    } catch (e) {
        console.error(e);
        return c.json({message: "Something went wrong"}, {status: 500}); 
    }

})





export default app;