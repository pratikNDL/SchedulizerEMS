import { z } from 'zod';
export declare const instituteSignup: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    password: string;
}, {
    name: string;
    email: string;
    password: string;
}>;
export declare const instituteSignin: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const departmentInput: z.ZodObject<{
    name: z.ZodString;
    code: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    code: string;
}, {
    name: string;
    code: string;
}>;
export declare const FacultyRankEnum: z.ZodEnum<["PROFESSOR", "ASSOCIATE_PROFESSOR", "ASSISTANT_PROFESSOR"]>;
export declare const facultyInput: z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    email: z.ZodString;
    rank: z.ZodEnum<["PROFESSOR", "ASSOCIATE_PROFESSOR", "ASSISTANT_PROFESSOR"]>;
    departmentId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    firstName: string;
    lastName: string;
    rank: "PROFESSOR" | "ASSOCIATE_PROFESSOR" | "ASSISTANT_PROFESSOR";
    departmentId: string;
}, {
    email: string;
    firstName: string;
    lastName: string;
    rank: "PROFESSOR" | "ASSOCIATE_PROFESSOR" | "ASSISTANT_PROFESSOR";
    departmentId: string;
}>;
export declare const courseInput: z.ZodObject<{
    name: z.ZodString;
    credits: z.ZodNumber;
    departmentId: z.ZodString;
    isLab: z.ZodBoolean;
    code: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    code: string;
    departmentId: string;
    credits: number;
    isLab: boolean;
}, {
    name: string;
    code: string;
    departmentId: string;
    credits: number;
    isLab: boolean;
}>;
export declare const blockInput: z.ZodObject<{
    name: z.ZodString;
    blockCode: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    blockCode: string;
}, {
    name: string;
    blockCode: string;
}>;
export declare const roomInput: z.ZodObject<{
    floor: z.ZodNumber;
    code: z.ZodString;
    blockId: z.ZodString;
    isLab: z.ZodBoolean;
    batchSize: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    code: string;
    isLab: boolean;
    floor: number;
    blockId: string;
    batchSize: number;
}, {
    code: string;
    isLab: boolean;
    floor: number;
    blockId: string;
    batchSize: number;
}>;
export type instituteSignupType = z.infer<typeof instituteSignup>;
export type instituteSigninType = z.infer<typeof instituteSignup>;
export type departmentInputType = z.infer<typeof departmentInput>;
export type facultyInputType = z.infer<typeof facultyInput>;
export type courseInputType = z.infer<typeof courseInput>;
export type blockInputType = z.infer<typeof blockInput>;
export type roomInputType = z.infer<typeof roomInput>;
