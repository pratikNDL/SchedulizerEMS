import { useState } from "react"
import LabeledInput from "./LabeledInput"
import {StudentGroupType} from '../hooks/useFetchStudentGroup'
import Button from "./Button"
import config from '../../config.json'
import axios from "axios"
import SelectInput from "./SelectInput"
import useFetchDepartments from "../hooks/useFetchDepartments"
import FormWrapper from "./FormWrapper"





function StudentGroupForm() {
    const departments = useFetchDepartments("");
    const [data, setData] = useState<Omit<StudentGroupType,'id'>| {}>({})
    
    const [prompt, setPrompt] = useState<String>("");
    const [error, setError] = useState(true);
    const [loading, setLoading] = useState(false)
        
    const handler = async() => {
        setLoading(true);
        const headers = {
            Authorization: localStorage.getItem('token')
        }

        
        try {
            if(!('passingYear' in data)) throw new Error();
            
            const reqData: Omit<StudentGroupType,'id'> = {
                ...data,
                batchCount: Number(data.batchCount),
                passingYear: Number(data.passingYear)
            }

            await  axios.post(config.BACKEND_URl+`/studentGroup`, reqData, { headers});
            setPrompt("New StudentGroup Added")
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
        setLoading(false);

    }


    return (
        <FormWrapper>
            <div className="flex flex-col gap-5 items-center justify-evenly">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                    <LabeledInput label="Name"  placeholder="ECS/2026" handler={(e) => {setData({...data, name: e.target.value})}}/>
                    <LabeledInput label="Section"  placeholder="A" handler={(e) => {setData({...data, section: e.target.value})}}/>
                    <LabeledInput label="Passing Year" type="number" placeholder="2026" handler={(e) => {setData({...data, passingYear: e.target.value})}}/>
                    <LabeledInput label="No. of Batches" type='number' placeholder="4" handler={(e) => {setData({...data, batchCount: e.target.value})}}/>
                    <SelectInput handler={(e) => {setData({...data, departmentId: e.target.value })}} label="Department"
                        values={departments.loading ? [] : departments.data.map((department) => { return{displayValue: department.name, targetValue: department.id}})}/>
                </div>

                <Button addCSS="bg-blue-400" isDisabled={loading} value="Add"  handler={handler}/>
                
                <div className={` text-center font-bold ${error ? 'text-red-500': 'text-green-400'}`}>
                    {prompt}
                </div> 
            </div>
        </FormWrapper>
    
  )
}

export default StudentGroupForm