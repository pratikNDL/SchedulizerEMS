import { useEffect, useState } from 'react'
import useFetchRoom, { RoomType } from '../hooks/useFetchRoom'
import { RoomSelect } from './RoomSelect'


function ManageRooms({id}: {id: string}) {
    const {loading , rooms} = useFetchRoom(""); 
    const [groupedRooms, setGroupedRooms] = useState<Record<string, Array<RoomType>>>({});

    const groupByBlocks = (rooms: Array<RoomType>) => {
      let newGroupedRooms: Record<string, Array<RoomType>> = {};

      rooms.forEach((room) => {
        if(!(room.academicBlock.blockCode in newGroupedRooms)) {
          newGroupedRooms[room.academicBlock.blockCode] = [];
        }
        newGroupedRooms[room.academicBlock.blockCode].push(room);
      })
      
      console.log(newGroupedRooms)
      setGroupedRooms(() => newGroupedRooms);
    }

    useEffect(() => {
      if(!loading) groupByBlocks(rooms);
    }, [loading])

  return (
    <div>
      <RoomSelect groupedRooms={groupedRooms} id={id}/>
    </div>
  )
}

export default ManageRooms