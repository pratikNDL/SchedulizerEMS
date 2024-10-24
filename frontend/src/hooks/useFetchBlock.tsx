import { blockInputType } from "@pratikndl/common-schedulizer-ems"
import { useEffect, useState } from "react";
import axios from "axios";
import config from '../../config.json'


function useFetchBlock(query: string) {

  const [data, setData] = useState<Array<blockInputType>>([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const headers = {
      Authorization: localStorage.getItem('token')
    }
    try {
      axios.get(config.BACKEND_URl+`/infrastructure/block?name=${query}`, { headers})
      .then((res) => {
        setData(res.data.blocks);
        setloading(false)
      })
  }
  catch(e: any){
      
  }
  }, [query])

  if(!data) setData([]);
  return {loading, data}
}

export default useFetchBlock