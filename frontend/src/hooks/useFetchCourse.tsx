import { courseInputType } from "@pratikndl/common-schedulizer-ems"
import { useEffect, useState } from "react";
import axios from "axios";
import config from '../../config.json'

type courseType = courseInputType & {
    id: string
}
function useFetchCourses(query: string) {

  const [data, setData] = useState<Array<courseType>>([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const headers = {
      Authorization: localStorage.getItem('token')
    }
    try {
      axios.get(config.BACKEND_URl+`/course?name=${query}`, { headers})
      .then((res) => {
        setData(res.data.courses);
        setloading(false)
      })
  }
  catch(e: any){
      
  }
  }, [query])

  if(!data) setData([]);
  return {loading, data}
}

export default useFetchCourses