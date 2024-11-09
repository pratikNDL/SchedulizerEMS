import {facultyInputType } from "@pratikndl/common-schedulizer-ems"
import { useEffect, useState } from "react";
import axios from "axios";
import config from '../../config.json'

export type FacultyFetchType = facultyInputType & {
    id: string,
    department: {
        code: string
    }
}
export type FacultyType = facultyInputType & {
  id: string,
  code: string
}
function useFetchFaculties(query: string) {

  const [data, setData] = useState<Array<FacultyType>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const headers = {
      Authorization: localStorage.getItem('token')
    }
    try {
      axios.get(config.BACKEND_URl+`/faculty?name=${query}`, { headers})
      .then((res) => {
        setData(res.data.faculties.map( (faculty: FacultyFetchType) => ({...faculty, code:faculty.department.code}) ));
        setLoading(false)
      })
  }
  catch(e: any){
      
  }
  }, [query])


  return {loading, data}
}

export default useFetchFaculties