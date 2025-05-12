"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouletteWheelSelector = void 0;
const utils_1 = require("./utils");
class RouletteWheelSelector {
    constructor(fitnesses) {
        this.fitnesses = fitnesses;
        this.cumulativeProbabilities = [];
        const totalFitness = fitnesses.reduce((sum, fitness) => sum + fitness, 0);
        const probabilities = fitnesses.map(fitness => fitness / totalFitness);
        probabilities.reduce((cumulative, p) => {
            this.cumulativeProbabilities.push(cumulative + p);
            return cumulative + p;
        }, 0);
    }
    select() {
        return (0, utils_1.lowerBound)(this.cumulativeProbabilities, Math.random());
    }
}
exports.RouletteWheelSelector = RouletteWheelSelector;
