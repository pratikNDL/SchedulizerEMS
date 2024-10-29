import { useEffect, useState } from "react";
import axios from "axios";
import config from '../../config.json'

export type RoomType = {
  id: string,
  floor: string,
  code: string,
  capacity: number,
  academicBlock: {
    blockCode: string,
    name: string
  } 
}

function useFetchRoom(query: string) {

  const [rooms, setRooms] = useState<Array<RoomType>>([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const headers = {
      Authorization: localStorage.getItem('token')
    }
    try {
      axios.get(config.BACKEND_URl+`/infrastructure/room?name=${query}`, { headers})
      .then((res) => {
        setRooms(res.data.rooms);
        setloading(false)
      })
  }
  catch(e: any){
      
  }
  }, [query])

  if(!rooms) setRooms([]);
  return {loading, rooms}
}

export default useFetchRoom