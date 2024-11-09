import { useEffect, useState } from "react";
import axios from "axios";
import config from '../../config.json'

export type StudentGroupFetchType = {
  id: string,
  name: string,
  passingYear: number,
  section: string,
  batchCount: number
  department: {
    code: string
  }
}

export type StudentGroupType = Exclude<StudentGroupFetchType, 'department'> & {
  departmentCode: string
}

function useFetchStudentGroup(query: string) {

  const [data, setData] = useState<Array<StudentGroupType>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const headers = {
      Authorization: localStorage.getItem('token')
    }
  
    axios.get(config.BACKEND_URl+`/studentGroup?name=${query}`, { headers })
    .then((res) => {
      setData(res.data.studentGroups.map((group: StudentGroupFetchType) => ({...group, departmentCode:group.department.code})));
      setLoading(false)
    })
    .catch((e) => {console.log(e)}) 
  
  }, [query])

  return {loading, data}
}

export default useFetchStudentGroup