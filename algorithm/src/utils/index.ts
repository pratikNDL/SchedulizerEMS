import { SchedulizerMetaData } from '../Schedulizer';
import { _Class, Room } from '../types';

export function lowerBound(arr:Array<number>, target: number) {
    let left = 0, right = arr.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid] < target) left = mid + 1; 
      else right = mid -1; 
    }
    return left; 
}

export function formatClass(data: any): _Class {
  const _class:_Class = {...data};
  _class.batches = data.batches;
  _class.concurrentClasses = data.concurrentClasses.map((_class: {id: string}) => _class.id)
  _class.courseType = data.course.courseType
  _class.courseCredits = data.course.credits
  _class.headCount = _class.courseType == 'THEORY'? 80: 30;
  _class.duration = _class.courseType == 'THEORY'? _class.courseCredits: _class.courseCredits*2;
  _class.classesPerWeek = _class.courseType == 'THEORY'? _class.courseCredits: 1 ;
  _class.facultyName = data.faculty.name;
  _class.courseName = data.course.name
  _class.studentGroupName = data.StudentGroup.name
  return _class;
}

export function facultyNonAvailabilityGenerator(data: any) {
  const nonAvailability: Map<string, Set<number>> = new Map();
  data.facultyAvailability.forEach((faculty: {facultyId: string, availability: number[]}) => {
      nonAvailability.set(faculty.facultyId, new Set(faculty.availability))
  })
  return nonAvailability;
}

export function studentGroupNonAvailabilityGenerator(data: any) {
  const nonAvailability: Map<string, Set<number>> = new Map();
  data.studentGroupAvailability.forEach((studentGroup: {studentGroupId: string, availability: number[]}) => {
      nonAvailability.set(studentGroup.studentGroupId, new Set(studentGroup.availability))
  })
  return nonAvailability;
}

export function _classesGenerator(data: any) {
  const _classes: Array<_Class> = data.classes.map((_class: any) => formatClass(_class));
  return _classes
}

export function roomGenerator(data: any) {
  const rooms: Array<Room> = data.rooms.map((room:any) => room)
  return rooms
}