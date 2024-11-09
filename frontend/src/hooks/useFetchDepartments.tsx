import { departmentInputType } from "@pratikndl/common-schedulizer-ems"
import { useEffect, useState } from "react";
import axios from "axios";
import config from '../../config.json'

export type DepartmentType = departmentInputType & {
    id: string
}
function useFetchDepartments(query: string) {

  const [data, setData] = useState<Array<DepartmentType>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const headers = {
      Authorization: localStorage.getItem('token')
    }
    try {
      axios.get(config.BACKEND_URl+`/department?name=${query}`, { headers})
      .then((res) => {
        setData(res.data.departments);
        setLoading(false)
      })
  }
  catch(e: any){
      
  }
  }, [query])

  return {loading, data}
}

export default useFetchDepartments