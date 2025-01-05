import PageWrapper from '../components/Wrappers/PageWrapper'
import Table from '../components/Table'
import useFetchMe from '../hooks/useFetchMe';
import useFetchBlock, { BlockType } from '../hooks/useFetchBlock';
import InfrastructureForm from '../components/Forms/InfrastructureForm';
import useFetchRoom, { RoomType } from '../hooks/useFetchRoom';
import axios from 'axios'
import config from '../../config.json'
import { useState } from 'react';

function Infrastructure() {
    useFetchMe();
    const [showBlocks, setShowBlocks] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const triggerRefresh = () => setRefresh(prev => !prev);
    
    const deleteRoomHandler = async (id: string) => {
      try {
        await axios.delete(`${config.BACKEND_URl}/infrastructure/room/${id}`, {headers:{Authorization: localStorage.getItem('token')}});
      } catch (e){
        console.log(e)
      }
    }

    const deleteBlockHandler = async (id: string) => {
      try {
        await axios.delete(`${config.BACKEND_URl}/infrastructure/block/${id}`, {headers:{Authorization: localStorage.getItem('token')}});
      } catch(e) {
        console.log(e)
      }

    }
  return (
    <PageWrapper>
     
      <div className='mb-5 flex bg-background-secondary w-fit rounded-md cursor-pointer text-white'>
          <div className={`py-1 px-3 rounded-md rounded-r-none border-2 border-primary-purple/75 ${!showBlocks ? 'bg-primary-purple/75 ' : 'bg-transparent'}`} onClick={() => setShowBlocks(false)}>Rooms</div>
          <div className={`py-1 px-3  rounded-md rounded-l-none border-2 border-primary-purple/75 border-l-0 ${showBlocks  ? 'bg-primary-purple/75 ': 'bg-transparent'}`} onClick={() => setShowBlocks(true)}>Blocks</div>
      </div>



      <InfrastructureForm showBlocks={showBlocks} triggerRefresh={triggerRefresh}/>
        {showBlocks ? 
          <Table <BlockType> key='blocks' fetchHandler={useFetchBlock} deleteHandler={deleteBlockHandler} titles={["Block Name", "Block Code"]} keysToDisplay={['name', 'blockCode']} refresh={refresh} />
          :<Table <RoomType> key='rooms' fetchHandler={useFetchRoom} deleteHandler={deleteRoomHandler} titles={["Block", "Code", "Floor", "Capacity", 'Type']} keysToDisplay={['blockCode', 'code', 'floor', 'capacity', 'type']} refresh={refresh} />
        }

    </PageWrapper>
  )
}

export default Infrastructure