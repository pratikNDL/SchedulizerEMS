import { useEffect, useState } from "react";
import axios from "axios";
import config from '../../config.json'
import { FacultyFetchType } from "./useFetchFaculty";
import { CourseFetchType, CourseType } from "./useFetchCourse";
import { RoomFetchType } from "./useFetchRoom";


export type ClassxFetchType = {
  faculty: FacultyFetchType,
  course: CourseFetchType,
  room: RoomFetchType
  id: string
  batch: {
    name: string
  }
}
export type ClassxType = {
  id: string
  facultyName: string,
  courseName: string,
  courseCode: string,
  roomCode: string,
  batchName: string
}



function useFetchClasses(scheduleId: string, query:string, studentGroupId?: string, courseType?:CourseType) {
  const [data, setData] = useState<Array<ClassxType>>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let url = `${config.BACKEND_URl}/schedule/class/${scheduleId}`;
    if(studentGroupId) url+= `/${studentGroupId}`;
    if(courseType) url += `?courseType=${courseType}`;
    axios.get(url, {headers:{Authorization: localStorage.getItem('token')}})
    .then((res) => {
      const transformedData = res.data.classes.map((classx:ClassxFetchType) => ({
        facultyName: classx.faculty.name, 
        courseName: classx.course.name, 
        courseCode: classx.course.code, 
        roomCode: `${classx.room.academicBlock.blockCode}-${classx.room.code}`, 
        id:classx.id, batchName:classx.batch?.name
      }))
      
      setData(transformedData);
      setLoading(false)
    })
    .catch((e) => {console.log(e)}) 
  
  }, [query])

  return {loading, data}
}

export default useFetchClasses