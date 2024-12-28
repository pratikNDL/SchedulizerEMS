import { useEffect, useState, Dispatch, SetStateAction } from 'react'
import useFetchRoom, { RoomType } from '../../hooks/useFetchRoom'
import Wrapper from '../Wrappers/Wrapper';
import Button from '../Inputs/Button';
import axios from 'axios';
import config from '../../../config.json'
import { useScheduleContext } from '../../context/ScheduleContext';


type PanelProps = {
  title: string,
  rooms: Array<RoomType>,
  selectedRooms: Set<string>,
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

  	const url = `${config.BACKEND_URl}/schedule/room/${schedule.id}`

  	useEffect(() => {
    	const newGroupedRooms: Record<string, Array<RoomType>> = {};
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

    axios.get(url, {headers})
    	.then((response) => {
      		setSelectedRooms(new Set(response.data.rooms.map((room:RoomType) => room.id)))
      		setLoading(false)
    	})
		.catch((e) => console.log(e))

  }, [])

	const handler = async () => {
		setLoading(true)
		const headers = { authorization: localStorage.getItem('token') }
		const body = { rooms: Array.from(selectedRooms)}
		try {
			await axios.put(url, body, {headers})
		}
		catch(e: any){
			console.log(e)
		}
		setLoading(false)
	}

  return (
	<div className=''>
		<Wrapper heading='Manage Rooms'>
        	<div className='text-primary-text '>
          		Below is the list of all the rooms available in the Institute. <br/>
          		Mark All the Rooms Available for Schedule <span className='text-green-400 font-bold'>Green</span>
        	</div>
      	</Wrapper>

      	{loading ? 
        	<div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
          		<PanelSkeleton/>
          		<PanelSkeleton/>
        	</div>
        :
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
				{Object.keys(groupedRooms).map((block) => (
					<Panel key={block} title={block} rooms={groupedRooms[block]} selectedRooms={selectedRooms} setSelectedRooms={setSelectedRooms}/>)
				)}
			</div>	
      	}

      	<div className='flex justify-center'>
        	<Button isDisabled={loading} handler={handler} className='w-1/5 border-input-highlight bg-transparent text-input-highlight  hover:bg-input-highlight/10 hover:border-input-highlight/60'>
          		Update Rooms
        	</Button>
      </div>
    </div>
  );
}


export function Panel({ title, rooms, selectedRooms, setSelectedRooms}: PanelProps) {
	
	const handler = (id: string) => {
    	const newSelectedRooms = new Set<string>(selectedRooms);
		selectedRooms.has(id) ? newSelectedRooms.delete(id) : newSelectedRooms.add(id);
		setSelectedRooms(newSelectedRooms as Set<string>);
	}	

  return (
    <Wrapper heading={`${title} Block`}>
     
      <div className='flex flex-col gap-1'>
        <div className='font-semibold text-primary-text/90'>Regular Classroom</div>
        <div className='flex gap-2 flex-wrap'>
          {rooms.filter((room) => !room.isLab).map((room) => (
            <Block key={room.id} title={room.code} isChecked={selectedRooms.has(room.id)} handler={handler} roomId={room.id}/>))}
        </div>
      </div>

      <div className='flex flex-col gap-1'>
        <div className='font-semibold text-primary-text/90'>Laboratory Classroom</div>
        <div className='flex gap-2 flex-wrap'>
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
      <div className={`py-1 px-2 text-xs font-semibold text-center hover:shadow-lg rounded-sm cursor-pointer border-2 ${selected ? 'text-primary-green border-primary-green': 'text-red  border-red'}`} onClick={clickHandler}>
        {title} 
      </div>
  );
}

export function BlockSkeleton() {
  
  return (    
      <div className={`py-1 px-2 text-xs font-semibold text-center g rounded-sm  border-2 border-primary-text/70 bg-background-secondary text-white/0 animate-pulse`}>
        {"0/0"}
      </div>
  );
}

export function PanelSkeleton() {
  return (
    <Wrapper heading={` Block`}>
     
    <div className='flex flex-col gap-1'>
      <div className='font-semibold text-primary-text/50 animate-pulse '>Regular Classroom</div>
      <div className='flex gap-2 flex-wrap'>
        {Array.from({ length: 10}, (_, i) => <BlockSkeleton key={i}/>)}
      </div>
    </div>

    <div className='flex flex-col gap-1'>
      <div className='font-semibold text-primary-text/50 animate-pulse'>Laboratory Classroom</div>
      <div className='flex gap-2 flex-wrap'>
        {Array.from({ length: 10}, (_, i) => <BlockSkeleton key={i}/>)}
      </div>
    </div>        
  </Wrapper>
  )
}

export default ManageRooms