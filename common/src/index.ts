import {z} from 'zod'

export const instituteSignup = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8)
})


export const instituteSignin = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})

export const departmentInput = z.object({
    name: z.string(),
    code: z.string()
})

const FacultyRankEnum = z.enum(['PROFESSOR', 'ASSOCIATE_PROFESSOR', 'ASSISTANT_PROFESSOR']);


export const facultyInput = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    rank: FacultyRankEnum,
    departmentId: z.string()
})

export const courseInput = z.object({
    name: z.string(),
    credits: z.number(),
    departmentId: z.string(),
    isLab: z.boolean()
})


export type instituteSignupType = z.infer<typeof instituteSignup>; 
export type instituteSigninType = z.infer<typeof instituteSignup>; 
export type departmentInputType = z.infer<typeof departmentInput>
export type facultyInputType = z.infer<typeof facultyInput>
export type courseInputType = z.infer<typeof courseInput>
