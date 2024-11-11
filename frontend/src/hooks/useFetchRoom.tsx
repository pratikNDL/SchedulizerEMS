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

function useFetchRoom(query: string, scheduleId?: string) {
  const [data, setData] = useState<Array<RoomType>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = scheduleId ?`${config.BACKEND_URl}/schedule/room/${scheduleId}?name=${query}`: `${config.BACKEND_URl}/infrastructure/room?name=${query}`
    axios.get(url, {headers: {Authorization: localStorage.getItem('token')}})
    .then((res) => {
      setData(res.data.rooms.map((room: RoomFetchType) => ({...room, type: room.isLab ? 'Laboratory' : 'Regular', blockCode: room.academicBlock.blockCode})));
      setLoading(false)
    })
  }, [query])
  return {loading, data}
}

export default useFetchRoom