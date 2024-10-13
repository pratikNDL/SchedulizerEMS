import {z} from 'zod'

export const instituteSignup = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8)
})

export type instituteSignupType = z.infer<typeof instituteSignup>; 

export const instituteSignin = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})

export type instituteSigninType = z.infer<typeof instituteSignup>; 