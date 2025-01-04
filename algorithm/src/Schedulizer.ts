import { RouletteWheelSelector } from "./RouletteWheelSelector";
import { Schedule } from "./Schedule";
import { _Class, Room,  } from "./types";

export type SchedulizerMetaData = {
    daysPerWeek: number,
    slotsPerDay: number,
    maxGeneration: number,
    mutationRate: number,
    populationSize: number
}

export class Schedulizer {
    public mappedRooms = new Map<number, Room>(); // index to room
    public mappedClasses = new Map<string, _Class>(); // id to class
    public population:Array<Schedule> = [];

    public daysPerWeek;
    public slotsPerDay;
    public roomCount;
    public generation = 0;
    public maxGeneration;
    public mutationRate;
    public populationSize
    public fittestSchedule = new Schedule(this);

    constructor(public data: SchedulizerMetaData, public classes: Array<_Class>, public rooms: Array<Room>, public facultyNonAvailability: Map<string, Set<number>>, public studentGroupNonAvailability: Map<string, Set<number>>) {
        this.daysPerWeek = data.daysPerWeek
        this.slotsPerDay = data.slotsPerDay
        this.roomCount =  rooms.length;
        this.maxGeneration = data.maxGeneration
        this.mutationRate =  data.mutationRate
        this.populationSize = data.populationSize

        this.rooms.forEach((room, i) => this.mappedRooms.set(i, room));
        this.classes.forEach(_class => this.mappedClasses.set(_class.id, _class))
    };

    initializePopulation() {
        this.population = Array.from({length: this.populationSize}, () => {
            const schedule = new Schedule(this);
            schedule.initializeByRandomization();
            if(schedule.fitness > this.fittestSchedule.fitness) this.fittestSchedule = schedule 
            return schedule
        })
        this.generation = 0;
    }

    spawnNextGeneration() {
        const parents = this.population;

        const fitnesses = parents.map(individual => {
            if(individual.fitness == -1) individual.calculateFitness();
            return individual.fitness;
        })

        const selector = new RouletteWheelSelector(fitnesses);

        const offsprings = Array.from({length: this.populationSize}, () => {
            const offSpring = new Schedule(this);
            // FutureFix: What if both parent are same
            offSpring.initializeByCrossover(this.population[selector.select()], this.population[selector.select()]);
            return offSpring;
        })

        this.population = this.elimination(parents, offsprings);
        this.generation++;
    }

    elimination(parents: Array<Schedule>, offsprings: Array<Schedule>) {
        parents.sort((a, b) => b.fitness - a.fitness);
        offsprings.sort((a, b) => b.fitness - a.fitness);
        let i = 0, j= 0;
        const nextGeneration: Array<Schedule> = Array.from({length: this.populationSize}, () => {
            if(parents[i].fitness > offsprings[j].fitness) return parents[i++];
            else return offsprings[j++];
        } )
        return nextGeneration;
    }



    


}


