"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schedulizer = void 0;
const RouletteWheelSelector_1 = require("./RouletteWheelSelector");
const Schedule_1 = require("./Schedule");
class Schedulizer {
    constructor(data, classes, rooms, facultyNonAvailability, studentGroupNonAvailability) {
        this.data = data;
        this.classes = classes;
        this.rooms = rooms;
        this.facultyNonAvailability = facultyNonAvailability;
        this.studentGroupNonAvailability = studentGroupNonAvailability;
        this.mappedRooms = new Map(); // index to room
        this.mappedClasses = new Map(); // id to class
        this.mappedStudentGroup = new Map();
        this.mappedFaculty = new Map();
        this.population = [];
        this.generation = 0;
        this.fittestSchedule = new Schedule_1.Schedule(this);
        this.daysPerWeek = data.daysPerWeek;
        this.slotsPerDay = data.slotsPerDay;
        this.roomCount = rooms.length;
        this.maxGeneration = data.maxGeneration;
        this.mutationRate = data.mutationRate;
        this.populationSize = data.populationSize;
        this.rooms.forEach((room, i) => this.mappedRooms.set(i, room));
        this.classes.forEach(_class => {
            var _a, _b;
            this.mappedClasses.set(_class.id, _class);
            if (!this.mappedStudentGroup.get(_class.studentGroupId))
                this.mappedStudentGroup.set(_class.studentGroupId, []);
            (_a = this.mappedStudentGroup.get(_class.studentGroupId)) === null || _a === void 0 ? void 0 : _a.push(_class);
            if (!this.mappedFaculty.get(_class.facultyId))
                this.mappedFaculty.set(_class.facultyId, []);
            (_b = this.mappedFaculty.get(_class.facultyId)) === null || _b === void 0 ? void 0 : _b.push(_class);
        });
    }
    ;
    initializePopulation() {
        this.population = Array.from({ length: this.populationSize }, () => {
            const schedule = new Schedule_1.Schedule(this);
            schedule.initializeByRandomization();
            if (schedule.fitness > this.fittestSchedule.fitness)
                this.fittestSchedule = schedule;
            return schedule;
        });
        this.generation = 0;
    }
    spawnNextGeneration() {
        const parents = this.population;
        const fitnesses = parents.map(individual => {
            if (individual.fitness == -1)
                individual.calculateFitness();
            return individual.fitness;
        });
        const selector = new RouletteWheelSelector_1.RouletteWheelSelector(fitnesses);
        const offsprings = Array.from({ length: this.populationSize }, () => {
            const offSpring = new Schedule_1.Schedule(this);
            // FutureFix: What if both parent are same
            offSpring.initializeByCrossover(this.population[selector.select()], this.population[selector.select()]);
            return offSpring;
        });
        this.population = this.elimination(parents, offsprings);
        this.findFittestSchedule();
        console.log(this.fittestSchedule.fitness);
        this.generation++;
    }
    elimination(parents, offsprings) {
        parents.sort((a, b) => b.fitness - a.fitness);
        offsprings.sort((a, b) => b.fitness - a.fitness);
        let i = 0, j = 0;
        const nextGeneration = Array.from({ length: this.populationSize }, () => {
            if (parents[i].fitness > offsprings[j].fitness)
                return parents[i++];
            else
                return offsprings[j++];
        });
        return nextGeneration;
    }
    findFittestSchedule() {
        for (const schedule of this.population) {
            if (schedule.fitness > this.fittestSchedule.fitness)
                this.fittestSchedule = schedule;
        }
    }
}
exports.Schedulizer = Schedulizer;
