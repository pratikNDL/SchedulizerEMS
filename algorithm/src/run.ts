import data from './data.json' 
import { Schedule } from './Schedule';
import { Schedulizer, SchedulizerMetaData } from './Schedulizer';
import { _Class, Room } from './types';
import { _classesGenerator, facultyNonAvailabilityGenerator, roomGenerator, studentGroupNonAvailabilityGenerator } from './utils';
import { writeFile } from 'fs/promises';


export default function run() {
    

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

const response = {
    days: schedulizer.data.daysPerWeek,
    slots: schedulizer.data.slotsPerDay,
    studentsGroupData: schedulizer.fittestSchedule.studentGroupFormat(),
    facultyData: schedulizer.fittestSchedule.facultyFormat()

}
console.log(response)
return response;


}

run()
// const saveResponseToFile = async () => {
  

//   try {
//     const jsonData = JSON.stringify(response, null, 2); // pretty print with 2 spaces
//     await writeFile('response.json', jsonData);
//     console.log('response.json has been saved!');
//   } catch (error) {
//     console.error('Error writing file:', error);
//   }
// };

// saveResponseToFile();




// tsc -b && clear && node ./dist/run.js