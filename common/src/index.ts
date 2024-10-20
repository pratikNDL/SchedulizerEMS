import {z} from 'zod'

export const instituteSignup = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8)
})


export const instituteSignin = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})

export const departmentInput = z.object({
    name: z.string().min(1),
    code: z.string().min(1)
})

export const FacultyRankEnum = z.enum(['PROFESSOR', 'ASSOCIATE_PROFESSOR', 'ASSISTANT_PROFESSOR']);


export const facultyInput = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    rank: FacultyRankEnum,
    departmentId: z.string()
})

export const courseInput = z.object({
    name: z.string().min(1),
    credits: z.number(),
    departmentId: z.string(),
    isLab: z.boolean(),
    code: z.string()
})

export const blockInput = z.object({
    name: z.string(),
    blockCode: z.string(),
}) 

export const roomInput = z.object({
    floor: z.number(),
    code: z.string(),
    blockId: z.string(),
    isLab: z.boolean(),
    batchSize: z.number()
})

export type instituteSignupType = z.infer<typeof instituteSignup>; 
export type instituteSigninType = z.infer<typeof instituteSignup>; 
export type departmentInputType = z.infer<typeof departmentInput>
export type facultyInputType = z.infer<typeof facultyInput>
export type courseInputType = z.infer<typeof courseInput>
export type blockInputType = z.infer<typeof blockInput>
export type roomInputType = z.infer<typeof roomInput>
