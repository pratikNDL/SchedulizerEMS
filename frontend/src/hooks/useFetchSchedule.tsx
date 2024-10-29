import { ScheduleInputType } from "@pratikndl/common-schedulizer-ems"
import { useEffect, useState } from "react";
import axios from "axios";
import config from '../../config.json'

type ScheduleType = ScheduleInputType & {
  id: string
}

function useFetchSchedule(query: string) {

  const [data, setData] = useState<Array<ScheduleType>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const headers = {
      Authorization: localStorage.getItem('token')
    }
    try {
      axios.get(config.BACKEND_URl+`/schedule?name=${query}`, { headers})
      .then((res) => {
        setData(res.data.schedules);
        setLoading(false)
      })
  }
  catch(e: any){
      
  }
  }, [query])

  if(!data) setData([]);
  return {loading, data}
}useFetchSchedule

export default useFetchSchedule