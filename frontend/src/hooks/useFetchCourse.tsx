import { useEffect, useState } from "react";
import axios from "axios";
import config from '../../config.json'

export type CourseType = "THEORY"|"PRACTICAL"
export type CourseFetchType = {
  id: string
  name: string;
  code: string;
  departmentId: string;
  credits: number;
  courseType: CourseType
  electiveBasketId?: string
}




function useFetchCourses(query: string, courseType?:CourseType, filter?:"regular"|"elective") {

  const [data, setData] = useState<Array<CourseFetchType>>([]);
  const [loading, setLoading] = useState(true);

  let url = `${config.BACKEND_URl}/course?name=${query}`
  if(courseType) url += `&courseType=${courseType}`
  if(filter) url += `&filter=${filter}`

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