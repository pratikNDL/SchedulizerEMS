import { Hono } from "hono";
import { authAdmin } from "../middlewares/authAdmin";
import { PrismaClient } from "@prisma/client";
import {  facultyInput } from "@pratikndl/common-schedulizer-ems";

const app = new Hono<{
    Variables: {
        instituteId: String
        prisma: PrismaClient
    }
}>();

app.use(authAdmin);

app.get('/all', async (c) => {
    const instituteId = c.get("instituteId") as string;
    const prisma = c.get("prisma")
    
    try {
        const faculties = await prisma.faculty.findMany({
            where : {
                instituteId: instituteId
            }
        })

        return c.json({faculties})
    } catch(e) {
        return c.json({message: "Something went wrong"}, {status: 500})
    }
})

app.get('/', async (c) => {
    const instituteId = c.get("instituteId") as string;
    const prisma = c.get("prisma")
    const query = c.req.query('name');
    
    try {
        const faculties = await prisma.faculty.findMany({
            where: {
                OR: [
                    { name: { contains: query, mode: 'insensitive' } },
                ],
                instituteId: instituteId
            },

            select: {
                name: true,
                rank: true,
                department: {
                    select: {
                        code: true
                    }
                }
            }
        });
        return c.json({faculties});

    } catch(e) {
        return c.json({message: "Something went wrong"}, {status: 500})
    }
})


app.get('/:code', async (c) => {
    const instituteId = c.get("instituteId") as string;
    const prisma = c.get("prisma")
    const code = c.req.param('code');
    
    try {
        const department = await prisma.department.findFirst({
            where: {
                instituteId: instituteId,
                code: code
            },
            select: {
                id: true
            }
        });

        if(!department) {
            return c.json({message: `no department for code ${code}`}, {status: 401});

        }
        const faculties = await prisma.faculty.findMany({
            where : {
                instituteId: instituteId,
                departmentId: department.id
            }
        })

        return c.json({faculties})
    } catch(e) {
        return c.json({message: "Something went wrong"}, {status: 500})
    }
})



app.post('/', async (c) => {
    const instituteId = c.get("instituteId") as string;
    const prisma = c.get("prisma")
    const body = await c.req.json();

    const {data, success} = facultyInput.safeParse(body);

    if(!success) {
        return c.json({message: "invlid Inputs"}, {status: 400})
    }
    
    try {        
        const existingFaculty = await prisma.faculty.findFirst({
            where: {
                email: data.email,
                instituteId: instituteId    
            }
        });

        
        if (existingFaculty) {
            return c.json({message: "Faculty with email already exist"}, {status: 409}); 
        }

        const newFaculty = await prisma.faculty.create({
            data: {
                ...data,
                instituteId: instituteId
            }
        })

        return c.json({message: "New Faculty Added", newFaculty}, {status: 201});

    } catch (e) {
        console.error(e);
        return c.json({message: "Something went wrong"}, {status: 500}); 
    }
})



export default app;