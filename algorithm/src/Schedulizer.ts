import { Schedule } from "./Schedule";
import { _Class, Room,  } from "./types";


export class Schedulizer {
    mappedRooms = new Map<number, Room>(); // index to room
    mappedClasses = new Map<string, _Class>(); // id to class
    roomCount: number;
    constructor(public daysPerWeek: number, public slotsPerDay: number,public classes: Array<_Class>, public rooms: Array<Room>, public facultyNonAvailability: Map<string, Set<number>>, public studentGroupNonAvailability: Map<string, Set<number>>) {

        this.roomCount =  rooms.length;
        this.rooms.forEach((room, i) => this.mappedRooms.set(i, room));
        this.classes.forEach(_class => this.mappedClasses.set(_class.id, _class))

    };

    


}


