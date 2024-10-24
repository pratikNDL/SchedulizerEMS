import axios from 'axios';
import Button from './Button'
import FormWrapper from './FormWrapper'
import LabeledInput from './LabeledInput'
import { useState } from 'react';
import config from '../../config.json'
import { blockInputType, roomInputType } from '@pratikndl/common-schedulizer-ems';
import Checkbox from './Checkbox';
import useFetchBlock from '../hooks/useFetchBlock';
import SelectInput from './SelectInput';

function InfrastructureForm() {

    const [blockData, setBlockData] = useState<blockInputType | {}>({})
    const [roomData, setRoomData] = useState<roomInputType | {}>({})
    
    const [prompt, setPrompt] = useState("");
    const [error, setError] = useState(true);
    const [loading, setloading] = useState(false)

    const blocks = useFetchBlock("");

    const blockHandler = async() => {
        setloading(true);
        const headers = {
            Authorization: localStorage.getItem('token')
        }
        console.log(blockData)
        try {
            await  axios.post(config.BACKEND_URl+`/infrastructure/block`, blockData, { headers});
            setPrompt("New Block Added")
            setError(false)
        }
        catch(e: any){
            console.log(e.response.data.error)
            if(!e.response.data.message) {
                setPrompt("Something went wrong... Try again later")
            }
            else {
                setPrompt(e.response.data.message);
            }
        }
        setloading(false);

    }

    const roomHandler = async() => {
        setloading(true);
        const headers = {
            Authorization: localStorage.getItem('token')
        }
        try {
            await  axios.post(config.BACKEND_URl+`/infrastructure/room`, blockData, { headers});
            setPrompt("New Room Added")
            setError(false)
        }
        catch(e: any){
            if(!e.response.data.message) {
                setPrompt("Something went wrong... Try again later")
            }
            else {
                setPrompt(e.response.data.message);
            }
        }
        setloading(false);

    }
  return (
    <FormWrapper>
            <div className="flex flex-col gap-5 items-center justify-evenly">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full ">
                    <LabeledInput  label="Block Name"  placeholder="First Year Block" handler={(e) => setBlockData({...blockData, name: e.target.value})}/>
                    <LabeledInput label="Block Code"  placeholder="G" handler={(e) => setBlockData({...blockData, blockCode: e.target.value})}/>
                </div>

                <Button addCSS="bg-blue-400" isDisabled={loading} value="Add"  handler={blockHandler}/>
                
                <div className={` text-center font-bold ${error ? 'text-red-500': 'text-green-400'}`}>
                    {prompt}
                </div> 
            </div>

            <div className="flex flex-col gap-5 items-center justify-evenly">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full ">
                    <LabeledInput label="Romm Code"  placeholder="0/4" handler={(e) => setRoomData({...roomData, code: e.target.value})}/>
                    <Checkbox label='Labarotary' handler={(e) => setRoomData({...roomData, code: e.target.checked})}/>
                    <LabeledInput label="Floor"  placeholder="4" handler={(e) => setRoomData({...roomData, code: e.target.value})}/>
                    <LabeledInput label="Room Capacity" type='number'  placeholder="4" handler={(e) => setRoomData({...roomData, code: e.target.value})}/>
                    <SelectInput handler={(e) => {setRoomData({...roomData, blockId: e.target.value })}} label="Block"
                        values={blocks.loading ? [] : blocks.data.map((block) => { return{displayValue: block.blockCode, targetValue: block.blockCode}})}/>
                
                </div>

                <Button addCSS="bg-blue-400" isDisabled={loading} value="Add"  handler={roomHandler}/>
                
                <div className={` text-center font-bold ${error ? 'text-red-500': 'text-green-400'}`}>
                    {prompt}
                </div> 
            </div>
        </FormWrapper>
  )
}

export default InfrastructureForm