import { useState } from "react"
import LabeledInput from "./LabeledInput"
import { ScheduleInputType } from "@pratikndl/common-schedulizer-ems"
import Button from "./Button"
import config from '../../config.json'
import axios from "axios"
import FormWrapper from "./FormWrapper"
import { useNavigate } from "react-router-dom"


function ScheduleForm() {
    const [data, setData] = useState< ScheduleInputType | {}>({})
    const [prompt, setPrompt] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
        
    const handler = async() => {
        setLoading(true);
        const headers = {
            Authorization: localStorage.getItem('token')
        }
        try {
            const res = await  axios.post(config.BACKEND_URl+`/schedule`, data, { headers});
            navigate(`schedule/${res.data.newSchedule.id}`)
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
                <div className="w-full ">
                    <LabeledInput  label="Schedule Name"  placeholder="ECS Winter 2024" handler={(e) => setData({...data, name: e.target.value})}/>
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