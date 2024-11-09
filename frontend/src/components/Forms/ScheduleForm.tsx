import { useState } from "react"
import LabeledInput from "../LabeledInput"

import Button from "../Button"
import config from '../../../config.json'
import axios from "axios"
import FormWrapper from "../FormWrapper"
import { useNavigate } from "react-router-dom"
import { ScheduleType } from "../../hooks/useFetchSchedule"

type ScheduleInputType = Omit<ScheduleType, 'id'>

function ScheduleForm() {
    const [data, setData] = useState< ScheduleInputType | {}>({})
    const [prompt, setPrompt] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
        
    const handler = async() => {
        setLoading(true);
        setPrompt('');

        const headers = {
            Authorization: localStorage.getItem('token')
        }
        if(!('days' in data)) {
            throw new Error("Invalid Inputs")
        } 

        const reqData:ScheduleInputType = {...data, days:Number(data.days), slots:Number(data.slots)}
        try {
            const res = await  axios.post(config.BACKEND_URl+`/schedule`, reqData, { headers});
            navigate(`${res.data.newSchedule.id}`)
            setPrompt("New Schedule Added")
            setError(false)
        }
        catch(e: any){
            setError(true)
            if(!e.response.data.message) {
                setPrompt("Something went wrong... Try again later")
            }
            else {
                setPrompt(e.response.data.message);
            }
        }
        setLoading(false);

    }

    return (
        <FormWrapper>
            <div className="flex flex-col gap-5 items-center justify-evenly w-full" >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                    <LabeledInput  label="Schedule Name"  placeholder="ECS Winter 2024" handler={(e) => setData({...data, name: e.target.value})}/>
                    <LabeledInput  label="Days in A Week"  placeholder="5" handler={(e) => setData({...data, days: e.target.value})}/>
                    <LabeledInput  label="Slots in A Day"  placeholder="12" handler={(e) => setData({...data, slots: e.target.value})}/>
                </div>

                <Button addCSS="bg-blue-400" isDisabled={loading} value="Add"  handler={handler}/>
                
                <div className={` text-center font-bold ${error ? 'text-red-500': 'text-green-400'}`}>
                    {prompt}
                </div> 
            </div>
        </FormWrapper>
    
  )
}

export default ScheduleForm