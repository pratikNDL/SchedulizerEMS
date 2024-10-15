import { departmentInputType } from "@pratikndl/common-schedulizer-ems"
import { useEffect, useState } from "react";
import axios from "axios";
import config from '../../config.json'

type departmentType = departmentInputType & {
    departmentId: string
}
function useFetchDepartments(query: string) {

  const [data, setData] = useState<Array<departmentType>>([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const headers = {
      Authorization: localStorage.getItem('token')
    }
    try {
      axios.get(config.BACKEND_URl+`/department?name=${query}`, { headers})
      .then((res) => {
        setData(res.data.departments);
        setloading(false)
      })
  }
  catch(e: any){
      
  }
  }, [query])

  if(!data) setData([]);
  return {loading, data}
}

export default useFetchDepartments