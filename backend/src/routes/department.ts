import { Hono } from "hono";
import { authAdmin } from "../middlewares/authAdmin";
import { PrismaClient } from "@prisma/client";
import { departmentInput } from "@pratikndl/common-schedulizer-ems";

const app = new Hono<{
    Variables: {
        instituteId: String
        prisma: PrismaClient
    }
}>();

app.use(authAdmin);


app.get('/', async (c) => {
    const instituteId = c.get("instituteId") as string;
    const prisma = c.get("prisma")
    const query = c.req.query('name');
    
    try {
        const departments = await prisma.department.findMany({
            where: {
                OR: [
                    { name: { contains: query, mode: 'insensitive' } },
                    { code: { contains: query, mode: 'insensitive' } },
                ],
                instituteId: instituteId
            }
        });
        return c.json({departments});

    } catch(e) {
        return c.json({message: "Something went wrong"}, {status: 500})
    }
})



app.post('/', async (c) => {
    const instituteId = c.get("instituteId") as string;
    const prisma = c.get("prisma")
    const body = await c.req.json();

    const {data, success} = departmentInput.safeParse(body);

    if(!success) {
        return c.json({message: "invalid Inputs"}, {status: 400})
    }
    
    try {        
        const existingDepartment= await prisma.department.findFirst({
            where: {
                OR: [
                    {name: data.name},
                    {code: data.code}, 
                ],
                instituteId: instituteId    
            }
        });

        
        if (existingDepartment) {
            return c.json({message: "Department with same name or code already exist"}, {status: 409}); 
        }

        const newDepartment = await prisma.department.create({
            data: {
                ...data,
                instituteId: instituteId
            }
        })

        return c.json({message: "New Department Created", newDepartment}, {status: 201});

    } catch (e) {
        console.error(e);
        return c.json({message: "Something went wrong"}, {status: 500}); 
    }
})



export default app;