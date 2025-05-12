"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_json_1 = __importDefault(require("./data.json"));
const Schedulizer_1 = require("./Schedulizer");
const utils_1 = require("./utils");
const metaData = {
    daysPerWeek: data_json_1.default.days,
    slotsPerDay: data_json_1.default.slots,
    maxGeneration: 200,
    mutationRate: 0.1,
    populationSize: 4
};
const rooms = (0, utils_1.roomGenerator)(data_json_1.default);
const classes = (0, utils_1._classesGenerator)(data_json_1.default);
const facultyNonAvailability = (0, utils_1.facultyNonAvailabilityGenerator)(data_json_1.default);
const studentGroupNonAvailability = (0, utils_1.studentGroupNonAvailabilityGenerator)(data_json_1.default);
const schedulizer = new Schedulizer_1.Schedulizer(metaData, classes, rooms, facultyNonAvailability, studentGroupNonAvailability);
schedulizer.initializePopulation();
for (let i = 0; i < 2; i++) {
    schedulizer.spawnNextGeneration();
}
console.log((schedulizer.fittestSchedule.studentGroupFormat()));
