"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schedule = void 0;
const RouletteWheelSelector_1 = require("./RouletteWheelSelector");
class Schedule {
    constructor(schedulizer) {
        this.schedulizer = schedulizer;
        this.schedule = [];
        this.fitness = -1;
        this.mappedSchedule = new Map();
        this.schedulizer.classes.forEach(({ id }) => {
            this.mappedSchedule.set(id, []);
        });
        this.schedule = Array.from({ length: this.schedulizer.daysPerWeek }, () => Array.from({ length: this.schedulizer.slotsPerDay }, () => Array.from({ length: this.schedulizer.roomCount }, () => [])));
    }
    ;
    initializeByRandomization() {
        this.schedulizer.classes.forEach(_class => {
            for (let i = 0; i < _class.classesPerWeek; i++) {
                const day = Math.floor(Math.random() * this.schedulizer.daysPerWeek);
                const startSlot = Math.floor(Math.random() * (this.schedulizer.slotsPerDay - (_class.duration - 1)));
                const room = Math.floor(Math.random() * this.schedulizer.roomCount);
                for (let i = 0; i < _class.duration; i++) {
                    this.schedule[day][startSlot + i][room].push(_class);
                }
                const index = (day * this.schedulizer.slotsPerDay * this.schedulizer.roomCount) + (startSlot * this.schedulizer.roomCount) + room;
                const indices = this.mappedSchedule.get(_class.id);
                if (!indices)
                    throw new Error(`Indices array not found  for id:${_class.id}: mappedSchedule may not be Initialized properly`);
                indices.push(index);
            }
        });
        this.calculateFitness();
    }
    initializeByCrossover(parent1, parent2) {
        const parents = [parent1, parent2];
        const fitness = parents.map(parent => {
            if (parent.fitness == -1)
                parent.calculateFitness();
            return parent.fitness;
        });
        const selector = new RouletteWheelSelector_1.RouletteWheelSelector(fitness);
        this.schedulizer.classes.forEach(_class => {
            for (let i = 0; i < _class.classesPerWeek; i++) {
                const parentIndices = parents[selector.select()].mappedSchedule.get(_class.id);
                if (!parentIndices)
                    throw new Error(`Indices array not found  for id:${_class.id}: mappedSchedule may not be Initialized properly`);
                const parentIndex = parentIndices[i];
                const day = Math.floor(parentIndex / (this.schedulizer.slotsPerDay * this.schedulizer.roomCount));
                const startSlot = Math.floor((parentIndex % (this.schedulizer.slotsPerDay * this.schedulizer.roomCount)) / this.schedulizer.roomCount);
                const room = parentIndex % this.schedulizer.roomCount;
                for (let i = 0; i < _class.duration; i++) {
                    this.schedule[day][startSlot + i][room].push(_class);
                }
                const indices = this.mappedSchedule.get(_class.id);
                if (!indices)
                    throw new Error(`Indices array not found  for id:${_class.id}: mappedSchedule may not be Initialized properly`);
                indices.push(parentIndex);
            }
        });
        this.calculateFitness();
    }
    calculateFitness() {
        let penalty = 0;
        this.schedule.forEach((day, dayIndex) => {
            day.forEach((slot, slotIndex) => {
                const position = dayIndex * this.schedulizer.slotsPerDay + slotIndex;
                const facultiesSeen = new Set();
                const batchesSeen = new Set();
                const classesSeen = new Set();
                slot.forEach((room, roomIndex) => {
                    const currRoom = this.schedulizer.mappedRooms.get(roomIndex);
                    if (!currRoom)
                        throw new Error(`Room not found  for index:${roomIndex}: mappedRooms may not be Initialized properly`);
                    if (this.calculateRoomHeadCount(dayIndex, slotIndex, roomIndex) > (currRoom === null || currRoom === void 0 ? void 0 : currRoom.capacity))
                        penalty += RoomOverBookedPenalty;
                    room.forEach(_class => {
                        var _a, _b;
                        if (facultiesSeen.has(_class.facultyId))
                            penalty += FacultyOverBookedPenalty;
                        else
                            facultiesSeen.add(_class.facultyId);
                        _class.batches.forEach(batchId => {
                            if (batchesSeen.has(batchId))
                                penalty += BatchOverBookedPenalty;
                            else
                                batchesSeen.add(batchId);
                        });
                        if ((_a = this.schedulizer.facultyNonAvailability.get(_class.facultyId)) === null || _a === void 0 ? void 0 : _a.has(position))
                            penalty += FacultyNonAvailabilityPenalty;
                        if ((_b = this.schedulizer.studentGroupNonAvailability.get(_class.studentGroupId)) === null || _b === void 0 ? void 0 : _b.has(position))
                            penalty += StudentGroupNonAvailabilityPenalty;
                        if (_class.preferredRoomId != currRoom.id) {
                            if (_class.courseType == 'PRACTICAL' || currRoom.isLab)
                                penalty += HardPreferredRoomMismatchPenalty;
                            else
                                penalty += SoftPreferredRoomMismatchPenalty;
                        }
                        classesSeen.add(_class.id);
                    });
                });
                classesSeen.forEach(classId => {
                    const _class = this.schedulizer.mappedClasses.get(classId);
                    if (!_class)
                        throw new Error(`Class not found for id:${classId}: mappedClasses may not be Initialized properly`);
                    _class.concurrentClasses.forEach(concurrentClassId => {
                        if (!classesSeen.has(concurrentClassId))
                            penalty += ConcurrentClassFailurePenalty;
                    });
                });
            });
        });
        this.fitness = 1 / (penalty);
    }
    view() {
        const prettyView = new Map();
        for (const [classId, indexes] of this.mappedSchedule.entries()) {
            prettyView.set(classId, indexes.map((index) => this.expandedIndex(index)));
        }
        console.log(prettyView);
    }
    expandedIndex(index) {
        var _a;
        const day = Math.floor(index / (this.schedulizer.slotsPerDay * this.schedulizer.roomCount));
        const startSlot = Math.floor((index % (this.schedulizer.slotsPerDay * this.schedulizer.roomCount)) / this.schedulizer.roomCount);
        const room = index % this.schedulizer.roomCount;
        return {
            day,
            startSlot,
            room,
            roomId: ((_a = this.schedulizer.mappedRooms.get(room)) === null || _a === void 0 ? void 0 : _a.id) || ""
        };
    }
    calculateRoomHeadCount(dayIndex, slotIndex, roomIndex) {
        const classes = this.schedule[dayIndex][slotIndex][roomIndex];
        return classes.reduce((sum, _class) => sum + _class.headCount, 0);
    }
}
exports.Schedule = Schedule;
const HARD_PENALTY = 10;
const SOFT_PENALTY = 5;
const RoomOverBookedPenalty = HARD_PENALTY;
const FacultyOverBookedPenalty = HARD_PENALTY;
const BatchOverBookedPenalty = HARD_PENALTY;
const FacultyNonAvailabilityPenalty = SOFT_PENALTY;
const StudentGroupNonAvailabilityPenalty = SOFT_PENALTY;
const ConcurrentClassFailurePenalty = HARD_PENALTY;
const HardPreferredRoomMismatchPenalty = HARD_PENALTY;
const SoftPreferredRoomMismatchPenalty = SOFT_PENALTY;
