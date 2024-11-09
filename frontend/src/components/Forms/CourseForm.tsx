import { useState } from "react"
import LabeledInput from "../LabeledInput"
import { courseInputType } from "@pratikndl/common-schedulizer-ems"
import Button from "../Button"
import config from '../../../config.json'
import axios from "axios"
import FormWrapper from "../FormWrapper"
import SelectInput from "../SelectInput"
import useFetchDepartments from "../../hooks/useFetchDepartments"
import Checkbox from "../Checkbox"


function RegisterCourse({triggerRefresh}: {triggerRefresh: () => void}) {
    const [data, setData] = useState<courseInputType | {}>({isLab: false})

    const [prompt, setPrompt] = useState<String>("");
    const [error, setError] = useState(true);
    const [loading, setLoading] = useState(false)

    const departments = useFetchDepartments("");

    const handler = async() => {
        setPrompt('');
        setLoading(true);
        const headers = {
            Authorization: localStorage.getItem('token')
        }
        
        if(!('credits' in data)) {
            setPrompt("Invalid Inputs");
            return;
        }

        try {
            await  axios.post(config.BACKEND_URl+`/course`, {...data, credits: Number(data.credits)}, { headers});
            setPrompt("New Course Added")
            setError(false)
        }
        catch(e: any){
            console.log(e)
            if(!e.response.data.message) {
                setPrompt("Something went wrong... Try again later")
            }
            else {
                setPrompt(e.response.data.message);
            }
        }
        setLoading(false);
        triggerRefresh();

    }

  
    return (
        <FormWrapper>
            <div className="flex flex-col gap-5 items-center justify-evenly">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full ">
                    <LabeledInput  label="Course Name"  placeholder="Machine Learning" handler={(e) => setData({...data, name: e.target.value})}/>
                    <LabeledInput label="Course Code"  placeholder="ECS303" handler={(e) => setData({...data, code: e.target.value})}/>
                    <LabeledInput label="Credits"  placeholder="3" type="number" handler={(e) => setData({...data, credits: Number(e.target.value)})}/>
                    <SelectInput handler={(e) => {setData({...data, departmentId: e.target.value })}} label="Department"
                        values={departments.loading ? [] : departments.data.map((department) => { return{displayValue: department.name, targetValue: department.id}})}/>
                    <Checkbox label="Requeirs Lab" handler={(e) => setData({...data, isLab: e.target.checked})}/>
                </div>

                <Button addCSS="bg-blue-400" isDisabled={loading} value="Add"  handler={handler}/>
                
                <div className={` text-center font-bold ${error ? 'text-red-500': 'text-green-400'}`}>
                    {prompt}
                </div> 
            </div>
        </FormWrapper>
    
  )
}

export default RegisterCourse