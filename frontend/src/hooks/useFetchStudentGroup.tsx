import { useEffect, useState } from "react";
import axios from "axios";
import config from '../../config.json'

export type StudentGroupType = {
  id: string,
  name: string,
  passingYear: number,
  section: string,
  batchCount: number
  department: {
    code: string
  }
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
      setData(res.data.studentGroups);
      setLoading(false)
    })
    .catch((e) => {console.log(e)}) 
  
  }, [query])

  // if(!data) setData([]);
  return {loading, data}
}

export default useFetchStudentGroup