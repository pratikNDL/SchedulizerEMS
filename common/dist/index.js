"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleInput = exports.roomInput = exports.blockInput = exports.courseInput = exports.facultyInput = exports.faculty = exports.FacultyRankEnum = exports.departmentInput = exports.department = exports.instituteSignin = exports.instituteSignup = void 0;
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
exports.department = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string().min(1),
    code: zod_1.z.string().min(1),
    instituteId: zod_1.z.string()
});
exports.departmentInput = zod_1.z.object({
    name: zod_1.z.string().min(1),
    code: zod_1.z.string().min(1)
});
exports.FacultyRankEnum = zod_1.z.enum(['PROFESSOR', 'ASSOCIATE_PROFESSOR', 'ASSISTANT_PROFESSOR']);
exports.faculty = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string().min(1),
    email: zod_1.z.string().min(1),
    instituteId: zod_1.z.string()
});
exports.facultyInput = zod_1.z.object({
    name: zod_1.z.string().min(1),
    email: zod_1.z.string().email(),
    rank: exports.FacultyRankEnum,
    departmentId: zod_1.z.string()
});
exports.courseInput = zod_1.z.object({
    name: zod_1.z.string().min(1),
    credits: zod_1.z.number(),
    departmentId: zod_1.z.string(),
    isLab: zod_1.z.boolean(),
    code: zod_1.z.string()
});
exports.blockInput = zod_1.z.object({
    name: zod_1.z.string(),
    blockCode: zod_1.z.string(),
});
exports.roomInput = zod_1.z.object({
    floor: zod_1.z.string(),
    code: zod_1.z.string(),
    blockId: zod_1.z.string(),
    isLab: zod_1.z.boolean(),
    capacity: zod_1.z.number(),
    name: zod_1.z.string().optional()
});
exports.scheduleInput = zod_1.z.object({
    name: zod_1.z.string()
});
