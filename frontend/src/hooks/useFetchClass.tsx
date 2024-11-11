import { useEffect, useState } from "react";
import axios from "axios";
import config from '../../config.json'
import { FacultyFetchType } from "./useFetchFaculty";
import { courseFetchType } from "./useFetchCourse";
import { RoomFetchType } from "./useFetchRoom";


export type ClassxFetchType = {
  faculty: FacultyFetchType,
  course: courseFetchType,
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

function useFetchClass(scheduleId: string, studentGroupId: string, query:string, showLabs: boolean=false) {
  const [data, setData] = useState<Array<ClassxType>>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const url = `${config.BACKEND_URl}/schedule/studentGroup/${studentGroupId}/class/${scheduleId}?name=${query}&showLabs=${showLabs}`;
    axios.get(url, {headers:{Authorization: localStorage.getItem('token')}})
    .then((res) => {
      const transformedData = res.data.classes.map((classx:ClassxFetchType) => ({facultyName: classx.faculty.name, courseName: classx.course.name, courseCode: classx.course.code, roomCode: `${classx.room.academicBlock.blockCode}-${classx.room.code}`, id:classx.id, batchName:classx.batch.name}))
      setData(transformedData);
      setLoading(false)
    })
    .catch((e) => {console.log(e)}) 
  
  }, [query])

  return {loading, data}
}

export default useFetchClass