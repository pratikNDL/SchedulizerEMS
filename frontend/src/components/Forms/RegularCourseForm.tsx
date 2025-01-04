import { useState } from "react"
import LabeledInput from "../Inputs/LabeledInput"
import config from '../../../config.json'
import axios from "axios"
import FormWrapper, { FormHandlerReturnType } from "../Wrappers/FormWrapper"
import SelectInput from "../Inputs/SelectInput"
import useFetchDepartments from "../../hooks/useFetchDepartments"

const CourseType = ["THEORY","PRACTICAL"];
export type CourseInputType = {
    name: string,
    code: string,
    credits: number,
    departmentId: string,
    courseType: (typeof CourseType)[number],
    electiveBasketId?: string
}


function RegularCourseForm({triggerRefresh}: {triggerRefresh: () => void}) {
	const [data, setData] = useState<CourseInputType | {}>({})
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
                <SelectInput handler={(e) => {setData({...data, courseType: e.target.value })}} label="Course Type"
                    values={CourseType.map((course) => { return{displayValue: course, targetValue: course}})}/>
            </div>  
        </FormWrapper>    
  )
}

export default RegularCourseForm