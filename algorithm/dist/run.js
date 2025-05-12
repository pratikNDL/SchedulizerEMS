"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = run;
const data_json_1 = __importDefault(require("./data.json"));
const Schedulizer_1 = require("./Schedulizer");
const utils_1 = require("./utils");
function run() {
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
    const response = {
        days: schedulizer.data.daysPerWeek,
        slots: schedulizer.data.slotsPerDay,
        studentsGroupData: deepMapToObject(schedulizer.fittestSchedule.studentGroupFormat()),
        facultyData: deepMapToObject(schedulizer.fittestSchedule.facultyFormat())
    };
    console.log(response);
    return response;
}
run();
// const saveResponseToFile = async () => {
//     try {
//       const jsonData = JSON.stringify(response, null, 2); // pretty print with 2 spaces
//       await writeFile('response.json', jsonData);
//       console.log('response.json has been saved!');
//     } catch (error) {
//       console.error('Error writing file:', error);
//     }
//   };
//   saveResponseToFile();
function deepMapToObject(map) {
    if (map instanceof Map) {
        const obj = {};
        for (const [key, value] of map.entries()) {
            obj[key] = deepMapToObject(value);
        }
        return obj;
    }
    else if (Array.isArray(map)) {
        return map.map(deepMapToObject);
    }
    else {
        return map;
    }
}
// tsc -b && clear && node ./dist/run.js
