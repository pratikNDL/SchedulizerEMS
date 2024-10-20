import { Hono } from "hono";
import { authAdmin } from "../middlewares/authAdmin";
import { PrismaClient } from "@prisma/client";
import {  blockInput, roomInput  } from "@pratikndl/common-schedulizer-ems";

const app = new Hono<{
    Variables: {
        instituteId: String
        prisma: PrismaClient
    }
}>();

app.use(authAdmin);

app.get('/block', async (c) => {
    const instituteId = c.get("instituteId") as string;
    const prisma = c.get("prisma")
    const query = c.req.query('name');
    
    try {
        const blocks = await prisma.academicBlock.findMany({
            where: {
                OR: [
                    { name: { contains: query, mode: 'insensitive' } },
                    { blockCode: { contains: query, mode: 'insensitive' } },
                ],
                instituteId: instituteId
            }
        });
        return c.json({blocks});

    } catch(e) {
        return c.json({message: "Something went wrong"}, {status: 500})
    }
})

app.post('/block', async (c) => {
    const instituteId = c.get("instituteId") as string;
    const prisma = c.get("prisma")
    const body = await c.req.json();

    const {data, success} = blockInput.safeParse(body);

    if(!success) {
        return c.json({message: "Invalid Inputs"}, {status: 400})
    }
    
    try {        
        const existingBlock = await prisma.academicBlock.findFirst({
            where: {
                OR: [
                    {name: data.name},
                    {blockCode: data.blockCode}
                ],
                instituteId: instituteId    
            }
        });

        
        if (existingBlock) {
            return c.json({message: "Block with same name or code already exist"}, {status: 409}); 
        }

        const newBlock = await prisma.academicBlock.create({
            data: {
                ...data,
                instituteId: instituteId
            }
        })

        return c.json({message: "New Block Added", newBlock}, {status: 201});

    } catch (e) {
        console.error(e);
        return c.json({message: "Something went wrong"}, {status: 500}); 
    }
})

app.get('/room', async (c) => {
    const instituteId = c.get("instituteId") as string;
    const prisma = c.get("prisma")
    const query = c.req.query('name');
    
    try {
        const rooms = await prisma.room.findMany({
            where: {
                OR: [
                    { code: { contains: query, mode: 'insensitive' } },
                ],
                instituteId: instituteId
            }
        });
        return c.json({rooms});

    } catch(e) {
        return c.json({message: "Something went wrong"}, {status: 500})
    }
})

app.post('/room', async (c) => {
    const instituteId = c.get("instituteId") as string;
    const prisma = c.get("prisma")
    const body = await c.req.json();

    const {data, success} = roomInput.safeParse(body);

    if(!success) {
        return c.json({message: "Invalid Inputs"}, {status: 400})
    }
    
    try {        
        const existingRoom = await prisma.room.findFirst({
            where: {
                ...data,    
            }
        });

        
        if (existingRoom) {
            return c.json({message: "Room with same details already exist"}, {status: 409}); 
        }

        const newRoom= await prisma.room.create({
            data: {
                ...data,
                instituteId: instituteId
            }
        })

        return c.json({message: "New Room Added", newRoom}, {status: 201});

    } catch (e) {
        console.error(e);
        return c.json({message: "Something went wrong"}, {status: 500}); 
    }
})



export default app;