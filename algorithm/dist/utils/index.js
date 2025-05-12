"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lowerBound = lowerBound;
exports.formatClass = formatClass;
exports.facultyNonAvailabilityGenerator = facultyNonAvailabilityGenerator;
exports.studentGroupNonAvailabilityGenerator = studentGroupNonAvailabilityGenerator;
exports._classesGenerator = _classesGenerator;
exports.roomGenerator = roomGenerator;
function lowerBound(arr, target) {
    let left = 0, right = arr.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] < target)
            left = mid + 1;
        else
            right = mid - 1;
    }
    return left;
}
function formatClass(data) {
    const _class = Object.assign({}, data);
    _class.batches = data.batches;
    _class.concurrentClasses = data.concurrentClasses.map((_class) => _class.id);
    _class.courseType = data.course.courseType;
    _class.courseCredits = data.course.credits;
    _class.headCount = _class.courseType == 'THEORY' ? 80 : 30;
    _class.duration = _class.courseType == 'THEORY' ? _class.courseCredits : _class.courseCredits * 2;
    _class.classesPerWeek = _class.courseType == 'THEORY' ? _class.courseCredits : 1;
    _class.facultyName = data.faculty.name;
    _class.courseName = data.course.name;
    _class.studentGroupName = data.StudentGroup.name;
    return _class;
}
function facultyNonAvailabilityGenerator(data) {
    const nonAvailability = new Map();
    data.facultyAvailability.forEach((faculty) => {
        nonAvailability.set(faculty.facultyId, new Set(faculty.availability));
    });
    return nonAvailability;
}
function studentGroupNonAvailabilityGenerator(data) {
    const nonAvailability = new Map();
    data.studentGroupAvailability.forEach((studentGroup) => {
        nonAvailability.set(studentGroup.studentGroupId, new Set(studentGroup.availability));
    });
    return nonAvailability;
}
function _classesGenerator(data) {
    const _classes = data.classes.map((_class) => formatClass(_class));
    return _classes;
}
function roomGenerator(data) {
    const rooms = data.rooms.map((room) => room);
    return rooms;
}
