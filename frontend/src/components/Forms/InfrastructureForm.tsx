import axios from 'axios';

import FormWrapper from '../FormWrapper'
import LabeledInput from '../LabeledInput'
import { useState } from 'react';
import config from '../../../config.json'
import { blockInputType, roomInputType } from '@pratikndl/common-schedulizer-ems';
import Checkbox from '../Checkbox';
import useFetchBlock from '../../hooks/useFetchBlock';
import SelectInput from '../SelectInput';

function InfrastructureForm({showBlocks, triggerRefresh}: {showBlocks:boolean, triggerRefresh:() => void}) {

    const [blockData, setBlockData] = useState<blockInputType | {}>({})
    const [roomData, setRoomData] = useState<roomInputType | {}>({isLab: false});
    const blocks = useFetchBlock("");

    const blockHandler = async() => {  
        try {
            await  axios.post(config.BACKEND_URl+`/infrastructure/block`, blockData, { headers: {Authorization: localStorage.getItem('token')}});
        } catch(e: any){
            return {
                success: false,
                message: e.response.data.message ? e.response.data.message : 'Something Went Wrong'
            };
        }
        return {
            success: true,
            message: "New Block Added"
        };
    }

    const roomHandler = async() => {
        if(!('capacity' in roomData)) return {
            success: false,
            message: 'Invalid Inputs'
        };
        try {
            await  axios.post(config.BACKEND_URl+`/infrastructure/room`, {...roomData, capacity: Number(roomData.capacity)}, {headers: {Authorization: localStorage.getItem('token')}});
        } catch(e: any){
            return {
                success: false,
                message: e.response.data.message ? e.response.data.message : 'Something Went Wrong'
            };
        }
        return {
            success: true,
            message: "New Room Added"
        };

    }
  return (
    <>
        {showBlocks ? 
            <FormWrapper handler={blockHandler} triggerRefresh={triggerRefresh}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full ">
                    <LabeledInput key={'blockName'} label="Block Name"  placeholder="First Year Block" handler={(e) => setBlockData({...blockData, name: e.target.value})}/>
                    <LabeledInput label="Block Code"  placeholder="G" handler={(e) => setBlockData({...blockData, blockCode: e.target.value})}/>
                </div>
            </FormWrapper>
            :      
            <FormWrapper handler={roomHandler} triggerRefresh={triggerRefresh}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full ">
                    <LabeledInput label="Room Code" key={'roomName'} placeholder="0/4" handler={(e) => setRoomData({...roomData, code: e.target.value})}/>
                    <LabeledInput label="Room Capacity" type='number'  placeholder="4" handler={(e) => setRoomData({...roomData, capacity: e.target.value})}/>
                    <LabeledInput label="Floor"  placeholder="4" handler={(e) => setRoomData({...roomData, floor: e.target.value})}/>
                    <SelectInput handler={(e) => {setRoomData({...roomData, blockId: e.target.value })}} label="Block"
                        values={blocks.loading ? [] : blocks.data.map((block) => { return{displayValue: block.blockCode, targetValue: block.id}})}/>
                    <Checkbox label='Laboratory' handler={(e) => setRoomData({...roomData, isLab: e.target.checked})}/>
                </div>
            </FormWrapper>
        }
    </>
  )
}

export default InfrastructureForm