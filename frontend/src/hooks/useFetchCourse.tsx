import { useEffect, useState } from "react";
import axios from "axios";
import config from '../../config.json'

export type CourseType = "REGULAR_THEORY"|"REGULAR_PRACTICAL"|"PROGRAM_ELECTIVE_THEORY"|"PROGRAM_ELECTIVE_PRACTICAL"
export type CourseFetchType = {
  id: string
  name: string;
  code: string;
  departmentId: string;
  credits: number;
  courseType: CourseType
}




function useFetchCourses(query: string, courseType?:CourseType) {

  const [data, setData] = useState<Array<CourseFetchType>>([]);
  const [loading, setLoading] = useState(true);

  let url = `${config.BACKEND_URl}/course?name=${query}`
  if(courseType) url += `&courseType=${courseType}`

  useEffect(() => {
    const headers = {
      Authorization: localStorage.getItem('token')
    }
    try {
      axios.get(url, { headers})
      .then((res) => {
        setData(res.data.courses);
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