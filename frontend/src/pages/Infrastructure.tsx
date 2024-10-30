import PageWrapper from '../components/PageWrapper'
import LabeledInput from '../components/LabeledInput'
import Table from '../components/Table'
import useFetchMe from '../hooks/useFetchMe';
import { ChangeEvent, useRef, useState } from 'react';
import useFetchBlock from '../hooks/useFetchBlock';
import InfrastructureForm from '../components/InfrastructureForm';
import useFetchRoom from '../hooks/useFetchRoom';
import axios from 'axios'
import config from '../../config.json'

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
    const deleteRoomHandler = async (id: string) => {
      const headers = {
        Authorization: localStorage.getItem('token')
      }
      try {
        await axios.delete(`${config.BACKEND_URl}/infrastructure/room/${id}`, {headers});
      }
      catch {
  
      }
      setQuery(" ")
      setTimeout(() => {
        setQuery("");
      }, 0);
    }
    const deleteBlockHandler = async (id: string) => {
      const headers = {
        Authorization: localStorage.getItem('token')
      }
      try {
        await axios.delete(`${config.BACKEND_URl}/infrastructure/block/${id}`, {headers});
      }
      catch {
  
      }
      setQuery(" ")
      setTimeout(() => {
        setQuery("");
      }, 0);
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
          <Table deleteHandler={deleteBlockHandler} isLoading={blocks.loading} titles={["Block Name", "Block Code"]} rows={blocks.data.map((block) => ({display: {name:block.name, blocCode:block.blockCode}, id:block.id}))} />
          :<Table deleteHandler={deleteRoomHandler} isLoading={loading} titles={["Block", "Code", "Floor", "Capacity", 'Type']} rows={rooms.map((room) => ({display: {blockId:room.academicBlock.blockCode, code:room.code, floor:room.floor, capacity:room.capacity, type: `${room.isLab? 'Laboratory': 'Regular' }`}, id:room.id}))} />
        }

      </div>
    </PageWrapper>
  )
}

export default Infrastructure