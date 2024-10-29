import PageWrapper from '../components/PageWrapper'
import LabeledInput from '../components/LabeledInput'
import Table from '../components/Table'
import useFetchMe from '../hooks/useFetchMe';
import { ChangeEvent, useRef, useState } from 'react';
import useFetchBlock from '../hooks/useFetchBlock';
import InfrastructureForm from '../components/InfrastructureForm';
import useFetchRoom from '../hooks/useFetchRoom';

function Infrastructure() {
    useFetchMe();
    const [showBlocks, setShowBlocks] = useState(true);
    const [query, setQuery] = useState("");
    const blocks = useFetchBlock(query)
    const {loading, rooms} = useFetchRoom(query)

    const timeoutRef = useRef<number | null>(null); 

    const searchHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = window.setTimeout(() => {
        setQuery(e.target.value); 
        }, 300);
    }

  return (
    <PageWrapper>
      <div className='flex gap-4 text-gray-800 text-sm font-medium mb-4'>
        <div className={`p-1 border-2 text-sm rounded cursor-pointer hover:bg-blue-200 border-blue-200 hover:shadow-xl ${showBlocks ? ' bg-blue-200 ': 'bg-white'}`} onClick={() => {setQuery(''); setShowBlocks(true)}}>
          Blocks
        </div>
        <div className={`p-1 border-2 text-sm rounded cursor-pointer hover:bg-blue-300 border-blue-300 hover:shadow-xl ${!showBlocks ? ' bg-blue-300 ': 'bg-white'}`} onClick={() => {setQuery(''); setShowBlocks(false)}}>
          Rooms
        </div>
      </div>
      <InfrastructureForm showBlocks={showBlocks}/>
      <div className=" my-4 p-5 bg-white shadow-xl rounded-md flex flex-col gap-4">
        <LabeledInput label="" placeholder={`Search ${showBlocks? 'Blocks': 'Rooms'}`} handler={searchHandler} />
        
        {showBlocks ? 
          <Table isLoading={blocks.loading} titels={["Block Name", "Block Code"]} rows={blocks.data.map((block) => {return {name:block.name, blocCode:block.blockCode}})} />
          :<Table isLoading={loading} titels={["Block", "Code", "Floor", "Capacity", 'Type']} rows={rooms.map((room) => {return {blockId:room.academicBlock.blockCode, code:room.code, floor:room.floor, capacity:room.capacity, type: `${room.isLab? 'Labarotry': 'Regular' }`}})} />
        }

      </div>
    </PageWrapper>
  )
}

export default Infrastructure