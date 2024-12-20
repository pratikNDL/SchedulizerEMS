import { useEffect, useState } from "react";
import axios from "axios";
import config from '../../config.json'

export type courseFetchType = {
  id: string
  name: string;
  code: string;
  departmentId: string;
  credits: number;
  isLab: boolean;
}
export type CourseType = courseFetchType & {
    type: 'T'|'P'

}
function useFetchCourses(query: string) {

  const [data, setData] = useState<Array<CourseType>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const headers = {
      Authorization: localStorage.getItem('token')
    }
    try {
      axios.get(config.BACKEND_URl+`/course?name=${query}`, { headers})
      .then((res) => {
        setData(res.data.courses.map((course: CourseType) => ({...course, type: course.isLab ? 'P' : 'T'})));
        setLoading(false)
      })
  }
  catch(e: any){
      
  }
  }, [query])

  if(!data) setData([]);
  return {loading, data}
}

export default useFetchCourses