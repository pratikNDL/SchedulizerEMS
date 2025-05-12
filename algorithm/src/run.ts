import data from './data.json' 
import { Schedule } from './Schedule';
import { Schedulizer, SchedulizerMetaData } from './Schedulizer';
import { _Class, Room } from './types';
import { _classesGenerator, facultyNonAvailabilityGenerator, roomGenerator, studentGroupNonAvailabilityGenerator } from './utils';




const metaData: SchedulizerMetaData = {
    daysPerWeek: data.days,
    slotsPerDay: data.slots,
    maxGeneration: 200,
    mutationRate: 0.1,
    populationSize: 4
}

const rooms: Array<Room> = roomGenerator(data);
const classes: Array<_Class> = _classesGenerator(data);
const facultyNonAvailability: Map<string, Set<number>> = facultyNonAvailabilityGenerator(data);
const studentGroupNonAvailability: Map<string, Set<number>> = studentGroupNonAvailabilityGenerator(data);

const schedulizer = new Schedulizer(metaData, classes, rooms, facultyNonAvailability, studentGroupNonAvailability);
schedulizer.initializePopulation();

for(let i=0; i<2; i++) {
    schedulizer.spawnNextGeneration();
}

console.log((schedulizer.fittestSchedule.studentGroupFormat()))

// tsc -b && clear && node ./dist/run.js