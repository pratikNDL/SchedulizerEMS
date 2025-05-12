import { _Class, Room } from "./types";

class GeneticAlgo {
    public indexToRoom = new Map<number, Room>()
    public idToRoom = new Map<string, Room>()
    public idToClass = new Map<string, _Class>()

    constructor(public days:number, public slots: number, public rooms: Array<Room>) {
        this.initializeRooms(rooms);
    }


    initializeRooms(rooms: Array<Room>): void {
        rooms.forEach((room, index) => {
            this.idToRoom.set(room.id, room);
            this.indexToRoom.set(index, room)
            room.index = index;
        })
    }

    
}