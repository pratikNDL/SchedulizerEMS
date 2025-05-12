
export type CourseType = 'THEORY' | 'PRACTICAL';

export type _Class = {
    id: string
    facultyId: string,
    facultyName: string,
    studentGroupId: string,
    studentGroupName: string
    batches: {id: string, name: string}[], // reference to batchId
    concurrentClasses: string[] // reference to other class
    courseType: CourseType,
    courseName: string,
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
    index? : number,
    code: string
}



export type ScheduleType = Array<Array<Array<Array<_Class>>>>;
