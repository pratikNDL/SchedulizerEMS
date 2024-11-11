import { useState } from "react"
import LabeledInput from "../LabeledInput"
import config from '../../../config.json'
import axios from "axios"
import FormWrapper from "../FormWrapper"
import { useNavigate } from "react-router-dom"
import { ScheduleType } from "../../hooks/useFetchSchedule"

type ScheduleInputType = Omit<ScheduleType, 'id'>

function ScheduleForm({triggerRefresh}: {triggerRefresh: () => void}) {
    const [data, setData] = useState< ScheduleInputType | {}>({})
    const navigate = useNavigate();
        
    const handler = async() => {
   

        if(!('days' in data)) return {
            success: false,
            message: 'Invalid Inputs'
        };

        const reqData:ScheduleInputType = {...data, days:Number(data.days), slots:Number(data.slots)}
        try {
            const res = await  axios.post(config.BACKEND_URl+`/schedule`, reqData, {headers:{Authorization: localStorage.getItem('token')}});
            navigate(`${res.data.newSchedule.id}`)
        } catch(e: any){
            return {
                success: false,
                message: e.response.data.message ? e.response.data.message : 'Something Went Wrong'
            };
        }
        return {
            success: true,
            message: "New Schedule Added"
        };


    }

    return (
        <FormWrapper handler={handler} triggerRefresh={triggerRefresh}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                <LabeledInput  label="Schedule Name"  placeholder="ECS Winter 2024" handler={(e) => setData({...data, name: e.target.value})}/>
                <LabeledInput  label="Days in A Week"  placeholder="5" handler={(e) => setData({...data, days: e.target.value})}/>
                <LabeledInput  label="Slots in A Day"  placeholder="12" handler={(e) => setData({...data, slots: e.target.value})}/>
            </div>
        </FormWrapper>
    
  )
}

export default ScheduleForm