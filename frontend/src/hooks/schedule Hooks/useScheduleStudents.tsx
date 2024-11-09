import { useEffect, useState } from "react";
import axios from "axios";
import config from '../../../config.json'
import { StudentGroupFetchType, StudentGroupType } from "../useFetchStudentGroup";



function useScheduleStudents(scheduleId: string) {

  const [data, setData] = useState<Array<StudentGroupType>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const headers = {
      Authorization: localStorage.getItem('token')
    }
    axios.get(config.BACKEND_URl+`/schedule/studentGroup/${scheduleId}`, { headers })
    .then((res) => {
      setData(res.data.schedule.studentGroups.map((group: StudentGroupFetchType) => ({...group, departmentCode:group.department.code})));
      setLoading(false)
    })
    .catch((e) => {console.log(e)}) 
  
  }, [scheduleId])

  return {loading, data}
}


export default useScheduleStudents