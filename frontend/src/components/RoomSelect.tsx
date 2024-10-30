import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { RoomType } from '../hooks/useFetchRoom';
import Wrapper from './Wrapper';
import Button from './Button';
import axios from 'axios';
import config from '../../config.json'
import Spinner from './Spinner';


type RoomSelectProps = {
  groupedRooms: Record<string, Array<RoomType>>;
  id: String
};

type RoomSelectPanelProps = {
  title: string,
  rooms: Array<RoomType>,
  selectedRooms: Set<String>,
  setSelectedRooms: Dispatch<SetStateAction<Set<string>>>;
};

type RoomSelectToggleProps = {
  title: string;
  isChecked: boolean;
  handler: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function RoomSelect({ groupedRooms, id }: RoomSelectProps) {
  const [selectedRooms, setSelectedRooms] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const headers = {
      Authorization: localStorage.getItem('token')
    }
    setLoading(true);
    axios.get(config.BACKEND_URl+`/schedule/${id}`, {headers})
    .then((response) => { setSelectedRooms(new Set(response.data.schedule.rooms.map((room:RoomType) => room.id)))})
    .then(() => setLoading(false))
    .catch((e) => console.log(e))

  }, [])

  const handler = async () => {
    setLoading(true)
    const headers = {
      authorization: localStorage.getItem('token')
    }
    const body = {
      rooms: Array.from(selectedRooms)
    }
    try {
      await axios.put(config.BACKEND_URl+`/schedule/rooms/${id}`, body, {headers})
    }
    catch(e: any){
      console.log(e)
    }
    setLoading(false)
  }

  return (
    <Wrapper>
      {loading ? <Spinner/> :
      <div className='flex flex-col gap-2'>
        {Object.keys(groupedRooms).map((block) => (
          <RoomSelectPanel 
            key={block}
            title={block} 
            rooms={groupedRooms[block]} 
            selectedRooms={selectedRooms}
            setSelectedRooms={setSelectedRooms}
          />
        ))}
        <div className='flex justify-center'>
          <Button isDisabled={loading} value={'Add'} addCSS='bg-blue-400' handler={handler}/>
        </div>
      </div>    }
    </Wrapper>
  );
}

export function RoomSelectPanel({ title, rooms, selectedRooms, setSelectedRooms}: RoomSelectPanelProps) {

  return (
    <div className='border p-2'>
        <div className='text-xl font-medium'>{title} Block</div>
        <div className='p-2 flex flex-col gap-4'>
          <div className='flex flex-col gap-1'>
            <div className='font-medium text-sm'>Regular Classroom</div>
            <div className='flex gap-1 flex-wrap'>
              {rooms.filter((room) => !room.isLab).map((room) => (
                <RoomSelectToggle 
                  key={room.id} title={room.code} isChecked={selectedRooms.has(room.id)} 
                  handler={(e) => {
                    const newSelectedRooms = new Set<String>(selectedRooms);
                    if (e.target.checked) {
                      newSelectedRooms.add(room.id);
                    } else {
                      newSelectedRooms.delete(room.id);
                    }
                    setSelectedRooms(newSelectedRooms as Set<string>);
                  }}
                />))}
            </div>
          </div>
          <div className='flex flex-col gap-1'>
            <div className='font-medium text-sm'>Laboratory Classroom</div>
            <div className='flex gap-1'>
              {rooms.filter((room) => room.isLab).map((room) => (
                <RoomSelectToggle 
                  key={room.id} title={room.code} isChecked={selectedRooms.has(room.id)} 
                  handler={(e) => {
                    const newSelectedRooms = new Set<String>(selectedRooms);
                    if (e.target.checked) {
                      newSelectedRooms.add(room.id);
                    } else {
                      newSelectedRooms.delete(room.id);
                    }
                    setSelectedRooms(newSelectedRooms as Set<string>);
                  }}
                />))}
            </div>
          </div>
        </div>       
    </div>
  );
}

export function RoomSelectToggle({ title, isChecked, handler }: RoomSelectToggleProps) {
  const [checked, setChecked] = useState(isChecked);

  return (
    <label className="cursor-pointer w-fit">
      <input type="checkbox" className="sr-only peer" checked={checked} 
        onChange={(e) => {
          setChecked(!checked)
          handler(e);
        } }
      />
      <div className="py-1 px-2 text-xs text-center text-gray-800 font-medium shadow-md bg-red-400 rounded-sm peer-checked:bg-green-400 transition duration-150 ease-in-out">{title} </div>
    </label>
  );
}
