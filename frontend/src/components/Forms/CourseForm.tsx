import { useState } from "react"
import LabeledInput from "../LabeledInput"
import { courseInputType } from "@pratikndl/common-schedulizer-ems"
import config from '../../../config.json'
import axios from "axios"
import FormWrapper, { FormHandlerReturnType } from "../FormWrapper"
import SelectInput from "../SelectInput"
import useFetchDepartments from "../../hooks/useFetchDepartments"
import Checkbox from "../Checkbox"


function RegisterCourse({triggerRefresh}: {triggerRefresh: () => void}) {
	const [data, setData] = useState<courseInputType | {}>({isLab: false})
    const departments = useFetchDepartments("");

    const handler = async(): Promise<FormHandlerReturnType>  => {    
        if(!('credits' in data)) return {
            success: false,
            message: 'Invalid Inputs'
        };
        try {
            await  axios.post(config.BACKEND_URl+`/course`, {...data, credits: Number(data.credits)}, {headers: {Authorization: localStorage.getItem('token')}});
        } catch(e: any){
            return {
                success: false,
                message: e.response.data.message ? e.response.data.message : 'Something Went Wrong'
            };
        }
        return {
            success: true,
            message: "New Course Added"
        };

    }

    return (
        <FormWrapper handler={handler} triggerRefresh={triggerRefresh}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full ">
                <LabeledInput  label="Course Name"  placeholder="Machine Learning" handler={(e) => setData({...data, name: e.target.value})}/>
                <LabeledInput label="Course Code"  placeholder="ECS303" handler={(e) => setData({...data, code: e.target.value})}/>
                <LabeledInput label="Credits"  placeholder="3" type="number" handler={(e) => setData({...data, credits: Number(e.target.value)})}/>
                <SelectInput handler={(e) => {setData({...data, departmentId: e.target.value })}} label="Department"
                    values={departments.loading ? [] : departments.data.map((department) => { return{displayValue: department.name, targetValue: department.id}})}/>
                <Checkbox label="Requires Lab" handler={(e) => setData({...data, isLab: e.target.checked})}/>
            </div>  
        </FormWrapper>    
  )
}

export default RegisterCourse