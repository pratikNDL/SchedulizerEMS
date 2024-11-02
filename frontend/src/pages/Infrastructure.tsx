import PageWrapper from '../components/PageWrapper'
import LabeledInput from '../components/LabeledInput'
import Table from '../components/Table'
import useFetchMe from '../hooks/useFetchMe';
import { ChangeEvent, useRef, useState } from 'react';
import useFetchBlock from '../hooks/useFetchBlock';
import InfrastructureForm from '../components/Forms/InfrastructureForm';
import useFetchRoom from '../hooks/useFetchRoom';
import axios from 'axios'
import config from '../../config.json'
import Wrapper from '../components/Wrapper';

function Infrastructure() {
    useFetchMe();
    const [showBlocks, setShowBlocks] = useState(false);
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
      <div className='mb-5 flex bg-gray-400 w-fit rounded-md text-sm text-gray-600 font-medium cursor-pointer '>
        <div className={`py-1 px-3 rounded-md rounded-r-none border-2 border-gray-400 ${showBlocks ? 'bg-white': 'bg-blue-400 text-white'}`} onClick={() => {setQuery(''); setShowBlocks(false)}}>Rooms</div>
        <div className={`py-1 px-3  rounded-md rounded-l-none border-2 border-gray-400 border-l-0 ${!showBlocks ? 'bg-white': 'bg-blue-400 text-white'}`} onClick={() => {setQuery(''); setShowBlocks(true)}}>Blocks</div>
      </div>



      <InfrastructureForm showBlocks={showBlocks}/>
    <Wrapper>

        <LabeledInput label="" placeholder={`Search ${showBlocks? 'Blocks': 'Rooms'}`} handler={searchHandler} />
        
        {showBlocks ? 
          <Table deleteHandler={deleteBlockHandler} isLoading={blocks.loading} titles={["Block Name", "Block Code"]} rows={blocks.data.map((block) => ({display: {name:block.name, blocCode:block.blockCode}, id:block.id}))} />
          :<Table deleteHandler={deleteRoomHandler} isLoading={loading} titles={["Block", "Code", "Floor", "Capacity", 'Type']} rows={rooms.map((room) => ({display: {blockId:room.academicBlock.blockCode, code:room.code, floor:room.floor, capacity:room.capacity, type: `${room.isLab? 'Laboratory': 'Regular' }`}, id:room.id}))} />
        }
    </Wrapper>

    </PageWrapper>
  )
}

export default Infrastructure