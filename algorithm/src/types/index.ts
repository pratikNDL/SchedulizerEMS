
export type CourseType = 'THEORY' | 'PRACTICAL';

export type _Class = {
    id: string
    facultyId: string,
    studentGroupId: string,
    batches: string[], // reference to batchId
    concurrentClasses: string[] // reference to other class
    courseType: CourseType,
    preferredRoomId: string,
    courseCredits: number,
    headCount: number,
    duration: number,
    classesPerWeek:number,
}

export type Room = {
    id: string,
    capacity: number,
    isLab: boolean,
    index? : number 
}



export type ScheduleType = Array<Array<Array<Array<_Class>>>>;
