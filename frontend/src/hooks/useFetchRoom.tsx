import { useEffect, useState } from "react";
import axios from "axios";
import config from '../../config.json'

export type RoomFetchType = {
  id: string,
  floor: string,
  code: string,
  capacity: number,
  isLab: boolean,
  academicBlock: {
    blockCode: string,
    name: string
  } 
}

export type RoomType = Exclude<RoomFetchType, 'academicBlock'| 'isLab'> & {
  blockCode: string,
  type: 'Regular' | 'Laboratory'
}

function useFetchRoom(query: string) {

  const [data, setData] = useState<Array<RoomType>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const headers = {
      Authorization: localStorage.getItem('token')
    }
    try {
      axios.get(config.BACKEND_URl+`/infrastructure/room?name=${query}`, { headers})
      .then((res) => {
        setData(res.data.rooms.map((room: RoomFetchType) => ({...room, type: room.isLab ? 'Laboratory' : 'Regular', blockCode: room.academicBlock.blockCode})));
        setLoading(false)
      })
  }
  catch(e: any){
      
  }
  }, [query])

  if(!data) setData([]);
  return {loading, data}
}

export default useFetchRoom