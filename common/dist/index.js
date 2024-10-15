"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseInput = exports.facultyInput = exports.departmentInput = exports.instituteSignin = exports.instituteSignup = void 0;
const zod_1 = require("zod");
exports.instituteSignup = zod_1.z.object({
    name: zod_1.z.string().min(1),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8)
});
exports.instituteSignin = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8)
});
exports.departmentInput = zod_1.z.object({
    name: zod_1.z.string().min(1),
    code: zod_1.z.string().min(1)
});
const FacultyRankEnum = zod_1.z.enum(['PROFESSOR', 'ASSOCIATE_PROFESSOR', 'ASSISTANT_PROFESSOR']);
exports.facultyInput = zod_1.z.object({
    firstName: zod_1.z.string().min(1),
    lastName: zod_1.z.string().min(1),
    email: zod_1.z.string().email(),
    rank: FacultyRankEnum,
    departmentId: zod_1.z.string()
});
exports.courseInput = zod_1.z.object({
    name: zod_1.z.string().min(1),
    credits: zod_1.z.number(),
    departmentId: zod_1.z.string(),
    isLab: zod_1.z.boolean()
});
