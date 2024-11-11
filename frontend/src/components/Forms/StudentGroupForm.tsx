import { useState } from "react"
import LabeledInput from "../LabeledInput"
import {StudentGroupType} from '../../hooks/useFetchStudentGroups'
import config from '../../../config.json'
import axios from "axios"
import SelectInput from "../SelectInput"
import useFetchDepartments from "../../hooks/useFetchDepartments"
import FormWrapper from "../FormWrapper"





function StudentGroupForm({triggerRefresh}: {triggerRefresh: () => void}) {
    const departments = useFetchDepartments("");
    const [data, setData] = useState<Omit<StudentGroupType,'id'>| {}>({})
    
  
        
    const handler = async() => {
    
        if(!('passingYear' in data)) return {
            success: false,
            message: 'Invalid Inputs'
        };
        const reqData: Omit<StudentGroupType,'id'> = {
            ...data,
            batchCount: Number(data.batchCount),
            passingYear: Number(data.passingYear)
        }
        try {
            await  axios.post(config.BACKEND_URl+`/studentGroup`, reqData, {headers: {Authorization: localStorage.getItem('token')}});
        }catch(e: any){
            return {
                success: false,
                message: e.response.data.message ? e.response.data.message : 'Something Went Wrong'
            };
        }
        return {
            success: true,
            message: "New StudentGroup Added"
        };
    }


    return (
        <FormWrapper handler={handler} triggerRefresh={triggerRefresh}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                    <LabeledInput label="Name"  placeholder="ECS/2026" handler={(e) => {setData({...data, name: e.target.value})}}/>
                    <LabeledInput label="Section"  placeholder="A" handler={(e) => {setData({...data, section: e.target.value})}}/>
                    <LabeledInput label="Passing Year" type="number" placeholder="2026" handler={(e) => {setData({...data, passingYear: e.target.value})}}/>
                    <LabeledInput label="No. of Batches" type='number' placeholder="4" handler={(e) => {setData({...data, batchCount: e.target.value})}}/>
                    <SelectInput handler={(e) => {setData({...data, departmentId: e.target.value })}} label="Department"
                        values={departments.loading ? [] : departments.data.map((department) => { return{displayValue: department.name, targetValue: department.id}})}/>
                </div>

 
        </FormWrapper>
    
  )
}

export default StudentGroupForm