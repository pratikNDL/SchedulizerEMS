import { lowerBound } from "./utils";

export class RouletteWheelSelector {
    private cumulativeProbabilities:Array<number> = [];
    constructor(public fitnesses:Array<number>) {
        const totalFitness = fitnesses.reduce((sum, fitness) => sum + fitness, 0);
        const probabilities = fitnesses.map(fitness => fitness / totalFitness);
        probabilities.reduce((cumulative, p) => {
            this.cumulativeProbabilities.push(cumulative + p);
            return cumulative + p;
        }, 0);
    }

    public select() {
        return lowerBound(this.cumulativeProbabilities, Math.random());
    }

}