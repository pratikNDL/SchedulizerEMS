import { facultyInputType } from "@pratikndl/common-schedulizer-ems"
import { useEffect, useState } from "react";
import axios from "axios";
import config from '../../config.json'

type facultyType = facultyInputType & {
    id: string,
    department: {
        code: string
    }
}
function useFetchFaculties(query: string) {

  const [data, setData] = useState<Array<facultyType>>([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const headers = {
      Authorization: localStorage.getItem('token')
    }
    try {
      axios.get(config.BACKEND_URl+`/faculty?name=${query}`, { headers})
      .then((res) => {
        setData(res.data.faculties);
        setloading(false)
      })
  }
  catch(e: any){
      
  }
  }, [query])

  if(!data) setData([]);
  return {loading, data}
}

export default useFetchFaculties