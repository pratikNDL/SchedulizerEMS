import { Class } from '../types'

export function isPracticalCourse(_class: Class) {
    return  _class.courseType=="REGULAR_PRACTICAL" || _class.courseType=="PROGRAM_ELECTIVE_PRACTICAL";
}