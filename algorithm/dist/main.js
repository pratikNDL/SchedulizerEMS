"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GeneticAlgo {
    constructor(days, slots, rooms) {
        this.days = days;
        this.slots = slots;
        this.rooms = rooms;
        this.indexToRoom = new Map();
        this.idToRoom = new Map();
        this.idToClass = new Map();
        this.initializeRooms(rooms);
    }
    initializeRooms(rooms) {
        rooms.forEach((room, index) => {
            this.idToRoom.set(room.id, room);
            this.indexToRoom.set(index, room);
            room.index = index;
        });
    }
}
