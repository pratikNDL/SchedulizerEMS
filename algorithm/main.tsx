type Room = {
    id: number;
    capacity: number;
};

type BatchBinding = {
    faculty: string;
    group: string;
    batch: string;
    course: string;
    duration: number;
    classesPerWeek: number;
    preferredRoom: number;
    isPractical: boolean;
    batchSize: number;
};

type FacultyAvailability = {
    [day: number]: number[]; // Day to list of unavailable timeslots
};

type Chromosome = Array<Array<Array<null | {
    faculty: string;
    group: string;
    batches: string[];
    course: string;
    duration: number;
    isPractical: boolean;
    totalStudents: number;
}>>>;

function isFacultyAvailable(faculty: string, day: number, timeslot: number, availabilities: FacultyAvailability[]): boolean {
    const facultyAvailability = availabilities.find(f => f[faculty]);
    return !(facultyAvailability && facultyAvailability[day]?.includes(timeslot));
}

// Initialization of a chromosome
function initializeChromosome(days: number, timeslots: number, rooms: Room[], bindings: BatchBinding[], availabilities: FacultyAvailability[]): { chromosome: Chromosome; unscheduled: BatchBinding[] } {
    let chromosome: Chromosome = Array.from({ length: days }, () =>
        Array.from({ length: timeslots }, () =>
            Array.from({ length: rooms.length }, () => null)
        )
    );

    let unscheduledBindings: BatchBinding[] = [];

    bindings.forEach(binding => {
        let classesScheduled = 0;

        while (classesScheduled < binding.classesPerWeek) {
            let day = Math.floor(Math.random() * days);
            let startSlot = Math.floor(Math.random() * (timeslots - binding.duration + 1));

            let roomIndex = binding.isPractical
                ? rooms.findIndex(r => r.id === binding.preferredRoom)
                : Math.floor(Math.random() * rooms.length);

            let maxAttempts = 5;
            let attempts = 0;
            let canSchedule = false;

            while (attempts < maxAttempts) {
                canSchedule = true;

                for (let j = 0; j < binding.duration; j++) {
                    if (
                        !isFacultyAvailable(binding.faculty, day, startSlot + j, availabilities) ||
                        (chromosome[day][startSlot + j][roomIndex] && (
                            binding.isPractical 
                            ? chromosome[day][startSlot + j][roomIndex]!.totalStudents + binding.batchSize > rooms[roomIndex].capacity 
                            : true
                        ))
                    ) {
                        canSchedule = false;
                        break;
                    }
                }

                if (canSchedule) break;

                if (!binding.isPractical) {
                    roomIndex = Math.floor(Math.random() * rooms.length);
                }
                attempts++;
            }

            if (canSchedule) {
                for (let j = 0; j < binding.duration; j++) {
                    const slot = chromosome[day][startSlot + j][roomIndex];
                    if (slot) {
                        slot.batches.push(binding.batch);
                        if (binding.isPractical) slot.totalStudents += binding.batchSize;
                    } else {
                        chromosome[day][startSlot + j][roomIndex] = {
                            faculty: binding.faculty,
                            group: binding.group,
                            batches: [binding.batch],
                            course: binding.course,
                            duration: binding.duration,
                            isPractical: binding.isPractical,
                            totalStudents: binding.isPractical ? binding.batchSize : 0
                        };
                    }
                }
                classesScheduled++;
            } else {
                break;
            }
        }

        if (classesScheduled < binding.classesPerWeek) {
            const remainingClasses = { ...binding, classesPerWeek: binding.classesPerWeek - classesScheduled };
            unscheduledBindings.push(remainingClasses);
        }
    });

    return { chromosome, unscheduled: unscheduledBindings };
}

// Fitness Evaluation
function fitnessEvaluation(
    chromosome: Chromosome,
    unscheduledBindings: BatchBinding[],
    rooms: Room[]
): number {
    let penalty = 0;

    // Penalize for unscheduled classes based on remaining required sessions
    unscheduledBindings.forEach(binding => {
        penalty += binding.classesPerWeek * 10; // Higher penalty for unscheduled classes
    });

    // Iterate over each day and timeslot
    chromosome.forEach(day => {
        day.forEach(timeslot => {
            let facultySet = new Set<string>();
            let groupCourseMap: { [group: string]: Set<string> } = {}; // Tracks courses per group in the timeslot
            const studentGroupSet = new Set<string>(); // To track student groups in the current timeslot

            timeslot.forEach((room, roomIndex) => {
                if (room) {
                    // Check for faculty overlaps
                    if (facultySet.has(room.faculty)) {
                        penalty += 15; // Higher penalty for faculty overlaps
                    } else {
                        facultySet.add(room.faculty);
                    }

                    // Check if student group overlaps
                    if (studentGroupSet.has(room.group)) {
                        penalty += 10; // Penalize for overlapping classes for the same student group
                    } else {
                        studentGroupSet.add(room.group);
                    }

                    // Track courses per group in this timeslot for practical batch constraints
                    if (room.isPractical) {
                        if (!groupCourseMap[room.group]) {
                            groupCourseMap[room.group] = new Set();
                        }
                        groupCourseMap[room.group].add(room.course);

                        // Check room capacity for practical classes
                        if (room.totalStudents > rooms[roomIndex].capacity) {
                            penalty += 20; // High penalty for exceeding room capacity
                        }
                    }
                }
            });

            // Penalize if any group has batches with overlapping practical courses in the same timeslot
            for (const group in groupCourseMap) {
                const courseSet = groupCourseMap[group];

                // Only penalize if the number of unique courses is less than the number of batches,
                // indicating that different batches from the same group are scheduled for the same course
                const batchCount = timeslot.filter(room => room && room.group === group && room.isPractical).length;
                if (courseSet.size < batchCount) {
                    penalty += 10; // Penalize overlapping practical courses for batches within the same group
                }
            }
        });
    });

    return -penalty; // Return negative penalty for minimization
}


// Crossover function
function crossover(parent1: Chromosome, parent2: Chromosome): Chromosome {
    let child: Chromosome = JSON.parse(JSON.stringify(parent1));

    const crossoverPoint = Math.floor(Math.random() * parent1.length);
    for (let day = crossoverPoint; day < parent1.length; day++) {
        for (let slot = 0; slot < parent1[day].length; slot++) {
            child[day][slot] = parent2[day][slot];
        }
    }

    return child;
}

// Mutation function
function mutation(chromosome: Chromosome, mutationRate: number): void {
    for (let day = 0; day < chromosome.length; day++) {
        for (let slot = 0; slot < chromosome[day].length; slot++) {
            if (Math.random() < mutationRate) {
                const roomIndex = Math.floor(Math.random() * chromosome[day][slot].length);
                const timeslotData = chromosome[day][slot][roomIndex];

                if (timeslotData) {
                    const newDay = Math.floor(Math.random() * chromosome.length);
                    const newSlot = Math.floor(Math.random() * chromosome[day].length);
                    const newRoomIndex = Math.floor(Math.random() * chromosome[day][slot].length);

                    chromosome[day][slot][roomIndex] = null;
                    chromosome[newDay][newSlot][newRoomIndex] = timeslotData;
                }
            }
        }
    }
}
