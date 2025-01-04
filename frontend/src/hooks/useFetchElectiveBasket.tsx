import { useEffect, useState } from "react";
import axios from "axios";
import config from '../../config.json'
import { CourseFetchType, CourseType } from "./useFetchCourse";

export type ElectiveBasketFetchType = {
  id: string
  name: string;
  code: string;
  departmentId: string;
  credits: number;
  courseCount: number;
  courses: Array<Pick<CourseFetchType, 'name'| 'code' | 'id'>>
  courseType: CourseType,
}




function useFetchElectiveBasket(query: string,  courseType?:CourseType) {

  const [data, setData] = useState<Array<ElectiveBasketFetchType>>([]);
  const [loading, setLoading] = useState(true);

  let url = `${config.BACKEND_URl}/elective?name=${query}`
  if(courseType) url += `&courseType=${courseType}`
 
  useEffect(() => {
    const headers = {
      Authorization: localStorage.getItem('token')
    }
    try {
      axios.get(url, { headers})
      .then((res) => {
        setData(res.data.electiveBaskets);
        setLoading(false)
      })
  }
  catch(e: any){
      
  }
  }, [query])

  if(!data) setData([]);
  return {loading, data}
}

export default useFetchElectiveBasket