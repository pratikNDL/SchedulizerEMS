import { useEffect, useState, Dispatch, SetStateAction } from 'react'
import useFetchRoom, { RoomType } from '../../hooks/useFetchRoom'
import Wrapper from '../Wrapper';
import Button from '../Button';
import axios from 'axios';
import config from '../../../config.json'
import { useScheduleContext } from '../../context/ScheduleContext';



type PanelProps = {
  title: string,
  rooms: Array<RoomType>,
  selectedRooms: Set<String>,
  setSelectedRooms: Dispatch<SetStateAction<Set<string>>>;
};

type BlockProps = {
  title: string;
  isChecked: boolean;
  roomId: string
  handler: (id: string) => void;
};

type GroupedRoomsType = Record<string, Array<RoomType>>



function ManageRooms() {
  const {data} = useFetchRoom(""); 
  const [groupedRooms, setGroupedRooms] = useState<GroupedRoomsType>({});
  const [selectedRooms, setSelectedRooms] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const schedule = useScheduleContext()

  useEffect(() => {
    let newGroupedRooms: Record<string, Array<RoomType>> = {};

    data.forEach((room) => {
      if(!(room.academicBlock.blockCode in newGroupedRooms)) {
        newGroupedRooms[room.academicBlock.blockCode] = [];
      }
      newGroupedRooms[room.academicBlock.blockCode].push(room);
    })
    setGroupedRooms(newGroupedRooms);
  }, [data])
  

  useEffect(() => {
    const headers = {Authorization: localStorage.getItem('token')}
    setLoading(true);
    axios.get(config.BACKEND_URl+`/schedule/${schedule.id}`, {headers})
    .then((response) => { setSelectedRooms(new Set(response.data.schedule.rooms.map((room:RoomType) => room.id)))})
    .then(() => setLoading(false))
    .catch((e) => console.log(e))
  }, [])

  const handler = async () => {
    setLoading(true)
    const headers = { authorization: localStorage.getItem('token') }
    const body = { rooms: Array.from(selectedRooms)}
    try {
      await axios.put(config.BACKEND_URl+`/schedule/rooms/${schedule.id}`, body, {headers})
    }
    catch(e: any){
      console.log(e)
    }
    setLoading(false)
  }

  return (
    <div className=''>
      <Wrapper>
        <div >
          <div className='text-xl font-bold text-gray-700'>
            Manage Rooms
          </div>
          <div className=''>
            Mark All the Rooms Available for Schedule <span className='text-green-400 font-bold'>Green</span>
          </div>
        </div>
      </Wrapper>

      {loading ? 
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
          <PanelSkeleton/>
          <PanelSkeleton/>
        </div> :
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
          {Object.keys(groupedRooms).map((block) => (<Panel key={block} title={block} rooms={groupedRooms[block]} selectedRooms={selectedRooms} setSelectedRooms={setSelectedRooms}/>))}
        </div>
      }

      <div className='flex justify-center'>
        <Button isDisabled={loading} value={'Add'} addCSS='bg-blue-400' handler={handler}/>
      </div>
    </div>
  );
}




export function Panel({ title, rooms, selectedRooms, setSelectedRooms}: PanelProps) {
  const handler = (id: string) => {
    const newSelectedRooms = new Set<String>(selectedRooms);
    selectedRooms.has(id) ? newSelectedRooms.delete(id) : newSelectedRooms.add(id);
    setSelectedRooms(newSelectedRooms as Set<string>);
  }
  return (
    <Wrapper>
      <div className='text-xl font-bold text-gray-800'>
        {title} Block
      </div>
      <div className='flex flex-col gap-1'>
        <div className='font-medium'>Regular Classroom</div>
        <div className='flex gap-1 flex-wrap'>
          {rooms.filter((room) => !room.isLab).map((room) => (
            <Block key={room.id} title={room.code} isChecked={selectedRooms.has(room.id)} handler={handler} roomId={room.id}/>))}
        </div>
      </div>
      <div className='flex flex-col gap-1'>
        <div className='font-medium text-sm'>Laboratory Classroom</div>
        <div className='flex gap-1'>
          {rooms.filter((room) => room.isLab).map((room) => (
            <Block key={room.id} title={room.code} isChecked={selectedRooms.has(room.id)} handler={handler} roomId={room.id}/>))}
        </div>
      </div>        
    </Wrapper>
  );
}

export function Block({ title, isChecked, handler, roomId }: BlockProps) {
  const [selected, setSelected] = useState(isChecked);
  const clickHandler = () => {
    setSelected(!selected);
    handler(roomId);
  }
  return (    
      <div className={`p-2 text-xs text-center text-gray-700 font-semibold hover:shadow-lg rounded-sm cursor-pointer ${selected ? 'bg-green-300': 'bg-red-300'}`} onClick={clickHandler}>
        {title} 
      </div>
  );
}

export function PanelSkeleton() {
  return (
    <Wrapper>
      <div className='animate-pulse bg-gray-300 py-3 w-1/5 rounded'/>
        <div className='flex flex-col gap-1'>
          <div className='animate-pulse bg-gray-300 py-1.5 w-1/12 rounded'/>
          <div className='flex gap-1'>
            {Array.from({length: 5}, (_, index) => <div key={index} className='animate-pulse bg-gray-300 p-4 w-10 rounded'/>)}
          </div>
        </div>
        <div className='flex flex-col gap-1'>
          <div className='animate-pulse bg-gray-300 py-1.5 w-1/12 rounded'/>
          <div className='flex gap-1'>
            {Array.from({length: 5}, (_, index) => <div key={index} className='animate-pulse bg-gray-300 p-4 w-10 rounded'/>)}
          </div>
        </div> 
    </Wrapper>
  )
}

export default ManageRooms