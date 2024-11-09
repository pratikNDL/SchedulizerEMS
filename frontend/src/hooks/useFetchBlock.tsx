import { blockInputType } from "@pratikndl/common-schedulizer-ems"
import { useEffect, useState } from "react";
import axios from "axios";
import config from '../../config.json'

export type BlockType = blockInputType & {
  id: string
}

function useFetchBlock(query: string) {

  const [data, setData] = useState<Array<BlockType>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const headers = {
      Authorization: localStorage.getItem('token')
    }
    try {
      axios.get(config.BACKEND_URl+`/infrastructure/block?name=${query}`, { headers})
      .then((res) => {
        setData(res.data.blocks);
        setLoading(false)
      })
  }
  catch(e: any){
      
  }
  }, [query])

  if(!data) setData([]);
  return {loading, data}
}

export default useFetchBlock