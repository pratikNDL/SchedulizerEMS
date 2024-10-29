import React, { Dispatch, SetStateAction, useState } from 'react';
import { RoomType } from '../hooks/useFetchRoom';
import Wrapper from './Wrapper';
import Button from './Button';

type RoomSelectProps = {
  groupedRooms: Record<string, Array<RoomType>>;
  
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

export function RoomSelect({ groupedRooms }: RoomSelectProps) {
  const [selectedRooms, setSelectedRooms] = useState<Set<string>>(new Set())
  return (
    <Wrapper>
      {Object.keys(groupedRooms).map((block) => (

        <RoomSelectPanel 
          key={block}
          title={block} 
          rooms={groupedRooms[block]} 
          selectedRooms={selectedRooms}
          setSelectedRooms={setSelectedRooms}
        />
      ))}

      <Button isDisabled={false} value={'add'} handler={() => console.log(selectedRooms)}/>
    </Wrapper>
  );
}

export function RoomSelectPanel({ title, rooms, selectedRooms, setSelectedRooms}: RoomSelectPanelProps) {
  return (
    <div >
        <div>{title}</div>
        <div className='flex gap-1'>
          {rooms.map((room) => (
            <RoomSelectToggle 
              key={room.id} // Add a key prop for each toggle
              title={room.code} 
              isChecked={selectedRooms.has(room.id)} 
              handler={(e) => {
                const newSelectedRooms = new Set<String>(selectedRooms);
                if (e.target.checked) {
                  newSelectedRooms.add(room.id);
                } else {
                  newSelectedRooms.delete(room.id);
                }
                setSelectedRooms(newSelectedRooms as Set<string>);
              }}
            />
          ))}
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
      <div className="py-1 px-2 text-sm text-center text-gray-800 font-medium shadow-md bg-red-400 rounded-sm peer-checked:bg-green-400 transition duration-150 ease-in-out">{title} </div>
    </label>
  );
}
